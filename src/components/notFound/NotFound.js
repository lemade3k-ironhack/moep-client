import React, { Component } from "react";
import data from "./animation/animation.json";
import LottieControl from "./LottieControl";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1 className="center linkColor">404</h1>
        <h5 className="center linkColor">
          you are at the wrong campsite, the festival is not here
        </h5>
        <Link to="/welcome" className="center linkColor">
          GO HOME!
        </Link>
        <LottieControl animation={data} style={{ backgroundSize: "cover" }} />
      </div>
    );
  }
}

export default NotFound;
