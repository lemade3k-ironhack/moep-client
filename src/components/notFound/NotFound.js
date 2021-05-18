import React, { Component } from "react";
import data from "./animation/animation.json";
import LottieControl from "./LottieControl";

class NotFound extends Component {
  render() {
    return (
      <div>
        <h2>404</h2>
        <h5>you are at the wrong campsite, the festival is not here</h5>
        <LottieControl animation={data} />
      </div>
    );
  }
}

export default NotFound;
