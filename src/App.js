import axios from "axios";
import config from "./config";
import { React, useState, useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { SignUp, SignIn } from "./components";

function App(props) {
  const [user, updateUser] = useState(null);
  const [fetchingUser, updateFetchingUser] = useState(true)  
  const [error, updateError] = useState(null);

  // if user has a session redirect to /welcome page
  useEffect(() => {
    if (user) props.history.push('/welcome')
  }, [user])

  // fetch user on mount
  useEffect(() => {
    axios.get(`${config.API_URL}/api/auth/user`, {withCredentials: true}) 
      .then((res) => {
        updateUser(res.data)
        updateFetchingUser(false)
      })
      .catch(() => {
        updateFetchingUser(false)
      })
  }, [])

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
      })
      .catch((err) => {
        updateError(err.response.data);
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const { name, password } = e.target;
    let user = {
      name: name.value,
      password: password.value,
    };

    axios
      .post(`${config.API_URL}/api/auth/signin`, user, { withCredentials: true })
      .then((response) => {
        updateUser(response.data);
        updateError(null);
      })
      .catch((err) => {
        updateError(err.response.data);
      });
  };


  if(fetchingUser){
    return <p>Loading . . . </p>
  }

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
      </Switch>
    </>
  );
}

export default withRouter(App);
