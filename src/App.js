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
} from "./components";
import CircularProgress from "@material-ui/core/CircularProgress";

function App(props) {
  const [user, updateUser] = useState(null);
  const [fetchingUser, updateFetchingUser] = useState(true);
  const [redirectPath, updateRedirectPath] = useState(null);
  const [error, updateError] = useState(null);
  const [concerts, updateConcerts] = useState([]);
  const [calendarStages, updateCalendarStages] = useState([]);
  const [calendarEvents, updateCalendarEvents] = useState([]);
  const { history } = props;

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
      .get(`${config.API_URL}/api/auth/user`, { withCredentials: true })
      .then((res) => {
        updateUser(res.data);
        updateFetchingUser(false);
      })
      .catch(() => {
        updateFetchingUser(false);
        updateRedirectPath("signin");
      });

    // get all stages and map to fullcalendar resources
    axios
      .get(`${config.API_URL}/api/stages`)
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
    axios.get(`${config.API_URL}/api/concerts`).then((res) => {
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
  }, []);

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

  if (fetchingUser) return <CircularProgress />;

  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <SignIn error={error} onSubmit={handleSignIn} />;
          }}
        />
        <Route
          path="/signup"
          render={() => {
            return <SignUp error={error} onSubmit={handleSignUp} />;
          }}
        />
        <Route
          path="/welcome"
          render={() => {
            return <UserDashboard user={user} />;
          }}
        />
        <Route
          exact
          path="/concerts"
          render={() => {
            return <ConcertList concerts={concerts} user={user} />;
          }}
        />
        <Route
          exact
          path="/calendar"
          render={() => {
            return (
              <Calendar
                stages={calendarStages}
                concerts={calendarEvents}
                user={user}
              />
            );
          }}
        />
        <Route
          exact
          path="/admin"
          render={() => {
            return <AdminDashboard user={user} />;
          }}
        />
        <Route
          path="/admin/:stageName/calendar"
          render={(routeProps) => {
            return <AdminCalendar user={user} {...routeProps} />;
          }}
        />
      </Switch>
    </>
  );
}

export default withRouter(App);
