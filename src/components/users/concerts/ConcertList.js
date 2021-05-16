import React from "react";
import ConcertDetail from "./ConcertDetail";

function ConcertList(props) {
  const { concerts } = props;

  return (
    <>
      {concerts.map((concert) => {
        return <ConcertDetail concert={concert} />;
      })}
    </>
  );
}

export default ConcertList;
