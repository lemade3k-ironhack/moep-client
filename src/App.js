import axios from "axios";
import config from "./config";
import { React, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { SignUp } from "./components";

function App(props) {
  const [user, updateUser] = useState(null);
  const [error, updateError] = useState(null);

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

  return (
    <>
      <Switch>
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
