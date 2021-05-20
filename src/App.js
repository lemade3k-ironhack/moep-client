import axios from "axios";
import config from "./config";
import { React, useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import {
  SignUp,
  SignIn,
  AdminDashboard,
  AdminCalendar,
  UserDashboard,
  ConcertList,
  Calendar,
  NotFound,
} from "./components";
import CircularProgress from "@material-ui/core/CircularProgress";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App(props) {
  const [user, updateUser] = useState(null);
  const [fetchingUser, updateFetchingUser] = useState(true);
  const [concerts, updateConcerts] = useState([]);
  const [favorites, updateFavorites] = useState([]);
  const [calendarStages, updateCalendarStages] = useState([]);
  const [calendarEvents, updateCalendarEvents] = useState([]);
  const [news, updateNews] = useState([]);
  const [showNewTickerForm, updateShowNewTickerForm] = useState(false);
  const [redirectPath, updateRedirectPath] = useState(null);
  const [error, updateError] = useState(null);
  const { history } = props;
  const festivalName = config.FESTIVAL_NAME;

  // handle redirects
  useEffect(() => {
    if (redirectPath === "signin") {
      history.push("/");
    } else if (redirectPath === "adminDashboard") {
      history.push("/admin");
    } else if (redirectPath === "userDashboard") {
      history.push("/welcome");
    }
  }, [history, redirectPath]);

  // fetch data on mount
  useEffect(() => {
    // check if user has a session
    axios
      .get(`${config.API_URL}/api/user`, { withCredentials: true })
      .then((res) => {
        updateUser(res.data);
        updateFavorites(res.data.concerts);
        updateFetchingUser(false);
      })
      .catch(() => {
        updateFetchingUser(false);
        updateRedirectPath("signin");
      });

    if (user) {
      // get all stages and map to fullcalendar resources
      axios
        .get(`${config.API_URL}/api/stages`, { withCredentials: true })
        .then((res) => {
          updateCalendarStages(
            res.data.map((stage) => {
              return {
                id: stage._id,
                title: stage.name,
              };
            })
          );
        })
        .catch((err) => updateError(err.response.data));

      // get all concerts
      axios
        .get(`${config.API_URL}/api/concerts`, { withCredentials: true })
        .then((res) => {
          const concerts = res.data;

          updateConcerts(concerts);
          // map concerts also to fullcalendar entries
          updateCalendarEvents(
            concerts.map((concert) => {
              return {
                resourceId: concert.stage._id,
                title: concert.bandname,
                start: concert.starttime,
                end: concert.endtime,
              };
            })
          );
        });
    }

    // Ticker messages (news)
    // get once on components mount
    handleGetNews();
    // then fetch every minute
    try {
      setInterval(async () => {
        await handleGetNews();
      }, 10000);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // handle get news
  const handleGetNews = () => {
    axios
      .get(`${config.API_URL}/api/news`, { withCredentials: true })
      .then((res) => {
        const news = res.data;

        if (news) {
          updateNews(news?.map((msg) => msg.message));
        } else {
          updateNews(null);
        }
      })
      .catch((err) => updateError(err.response.data));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const { name, password, passwordConfirmation } = e.target;
    let newUser = {
      name: name.value,
      password: password.value,
      passwordConfirmation: passwordConfirmation.value,
    };

    axios
      .post(`${config.API_URL}/api/auth/signup`, newUser, {
        withCredentials: true,
      })
      .then((res) => {
        updateUser(res.data);
        updateError(null);
        updateRedirectPath("userDashboard");
      })
      .catch((err) => updateError(err.response.data));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const { name, password } = e.target;
    let user = {
      name: name.value,
      password: password.value,
    };

    axios
      .post(`${config.API_URL}/api/auth/signin`, user, {
        withCredentials: true,
      })
      .then((res) => {
        updateUser(res.data);
        updateError(null);

        if (res.data.role === "admin") {
          updateRedirectPath("adminDashboard");
        } else {
          updateRedirectPath("userDashboard");
        }
      })
      .catch((err) => {
        updateError(err.response.data);
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    axios
      .get(`${config.API_URL}/api/auth/logout`, { withCredentials: true })
      .then(() => {
        updateUser(null);
        updateRedirectPath("signin");
      })
      .catch((err) => {
        updateError(err.response.data);
      });
  };

  const handleUpdateFavorite = (concert) => {
    axios
      .post(
        `${config.API_URL}/api/upcoming/update`,
        { favorites, concert },
        { withCredentials: true }
      )
      .then((res) => {
        updateFavorites(res.data);
        updateError(null);
      })
      .catch((err) => updateError(err.response.data));
  };

  const handleNewTicker = (newMessage) => {
    axios
      .post(
        `${config.API_URL}/api/news/create`,
        {
          message: newMessage.message,
          duration: newMessage.duration,
        },
        { withCredentials: true }
      )
      .then((res) => {
        const message = res.data.message;

        !news ? updateNews([message]) : updateNews([message, ...news]);
        updateError(null);
        updateShowNewTickerForm(false);
      })
      .catch((err) => console.log(err));
  };

  const handleShowNewTickerForm = () => {
    updateShowNewTickerForm(true);
  };

  if (fetchingUser) return <CircularProgress />;

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <SignIn
                festivalName={festivalName}
                error={error}
                onSubmit={handleSignIn}
              />
            );
          }}
        />
        <Route
          path="/signup"
          render={() => {
            return (
              <SignUp
                festivalName={festivalName}
                error={error}
                onSubmit={handleSignUp}
              />
            );
          }}
        />
        <Route
          path="/welcome"
          render={() => {
            return (
              <UserDashboard
                user={user}
                news={news}
                favorites={favorites}
                updateFavorite={handleUpdateFavorite}
                onLogout={handleLogout}
              />
            );
          }}
        />
        <Route
          exact
          path="/lineup"
          render={() => {
            return (
              <ConcertList
                user={user}
                concerts={concerts}
                favorites={favorites}
                updateFavorite={handleUpdateFavorite}
                onLogout={handleLogout}
              />
            );
          }}
        />
        <Route
          exact
          path="/timetable"
          render={() => {
            return (
              <Calendar
                user={user}
                stages={calendarStages}
                concerts={calendarEvents}
                favorites={favorites}
                updateFavorite={handleUpdateFavorite}
                onLogout={handleLogout}
              />
            );
          }}
        />
        <Route
          exact
          path="/admin"
          render={() => {
            return (
              <AdminDashboard
                user={user}
                news={news}
                onNewTicker={handleNewTicker}
                showNewTickerForm={showNewTickerForm}
                handleShowNewTickerForm={handleShowNewTickerForm}
                onLogout={handleLogout}
              />
            );
          }}
        />
        <Route
          path="/admin/:stageName/calendar"
          render={(routeProps) => {
            return (
              <AdminCalendar
                user={user}
                onLogout={handleLogout}
                {...routeProps}
              />
            );
          }}
        />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default withRouter(App);
