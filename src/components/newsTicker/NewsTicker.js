import React from "react";
import Ticker from "react-ticker";

function NewsTicker(props) {
  const { news } = props;

  return (
    <Ticker>
      {() => <p style={{ whiteSpace: "nowrap" }}> {news.join(" +++ ")} +++</p>}
    </Ticker>
  );
}

export default NewsTicker;
