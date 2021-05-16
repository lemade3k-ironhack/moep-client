import axios from "axios";
import config from "./config";
import { React, useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { SignUp, SignIn, AdminDashboard, DashUser } from "./components";
import CircularProgress from "@material-ui/core/CircularProgress";

import Concerts from "./components/user/Concerts";
import ConcertDetail from "./components/user/ConcertDetail";

function App(props) {
  const [user, updateUser] = useState(null);
  const [fetchingUser, updateFetchingUser] = useState(true);
  const [redirectPath, updateRedirectPath] = useState(null);
  const [error, updateError] = useState(null);
  const [concerts, updateConcerts] = useState([]);
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

    axios.get("http://localhost:5005/api/concerts").then((response) => {
      updateConcerts(response.data);
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
      .then((response) => {
        updateUser(response.data);
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
          render={(routeProps) => {
            return (
              <SignIn error={error} onSubmit={handleSignIn} {...routeProps} />
            );
          }}
        />
        <Route
          path="/signup"
          render={(routeProps) => {
            return (
              <SignUp error={error} onSubmit={handleSignUp} {...routeProps} />
            );
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
          render={(routeProps) => {
            return <Concerts concerts={concerts} user={user} {...routeProps} />;
          }}
        />
        <Route
          path="/welcome"
          render={(routeProps) => {
            return <DashUser user={user} {...routeProps} />;
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
}

export default withRouter(App);
