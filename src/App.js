import axios from "axios";
import config from "./config";
import { React, useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import {
<<<<<<< HEAD
   SignUp,
   SignIn,
   AdminDashboard,
   UserDashboard,
   ConcertList,
   ConcertDetail,
=======
  SignUp,
  SignIn,
  AdminDashboard,
  AdminCalendar,
  UserDashboard,
  ConcertList,
  ConcertDetail,
>>>>>>> 69bf4b81992c5be94c8fc0fd50dead90a38aeb23
} from "./components";
import CircularProgress from "@material-ui/core/CircularProgress";

function App(props) {
   const [user, updateUser] = useState(null);
   const [fetchingUser, updateFetchingUser] = useState(true);
   const [redirectPath, updateRedirectPath] = useState(null);
   const [error, updateError] = useState(null);
   const [concerts, updateConcerts] = useState([]);
   const [upcoming, updateUpcoming] = useState([]);
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

   // fetch user on mount
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

      // get all concerts
      axios.get("http://localhost:5005/api/concerts").then((response) => {
         updateConcerts(response.data);
      });

      //get upcoming concerts
      axios.get("http://localhost:5005/api/upcoming").then((response) => {
         updateUpcoming(response.data);
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

<<<<<<< HEAD
      axios
         .post(`${config.API_URL}/api/auth/signup`, newUser, {
            withCredentials: true,
         })
         .then((response) => {
            updateUser(response.data);
            updateError(null);
            updateRedirectPath("userDashboard");
         })
         .catch((err) => updateError(err.response.data));
   };
=======
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
>>>>>>> 69bf4b81992c5be94c8fc0fd50dead90a38aeb23

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

<<<<<<< HEAD
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
               path="/concerts/:concertId"
               render={(routeProps) => {
                  return <ConcertDetail user={user} {...routeProps} />;
               }}
            />
            <Route
               path="/concerts"
               render={() => {
                  return <ConcertList concerts={concerts} user={user} />;
               }}
            />
            <Route
               path="/welcome"
               render={() => {
                  return <UserDashboard upcoming={upcoming} user={user} />;
               }}
            />
            <Route
               exact
               path="/admin"
               render={() => {
                  return <AdminDashboard user={user} />;
               }}
            />
         </Switch>
      </>
   );
=======
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
          path="/concerts"
          render={() => {
            return <ConcertList concerts={concerts} user={user} />;
          }}
        />
        <Route
          path="/concerts/:concertId"
          render={(routeProps) => {
            return <ConcertDetail user={user} {...routeProps} />;
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
>>>>>>> 69bf4b81992c5be94c8fc0fd50dead90a38aeb23
}

export default withRouter(App);
