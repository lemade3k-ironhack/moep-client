import React from "react";
import { ConcertDetail }from "../../index";

function ConcertList(props) {
  const { concerts } = props;

  return (
    <>
      {concerts.map((concert, i) => {
        return <ConcertDetail key={i} concert={concert} />;
      })}
    </>
  );
}

export default ConcertList;
