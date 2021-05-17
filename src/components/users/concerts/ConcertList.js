import React from "react";
import { ConcertDetail }from "../../index";

function ConcertList(props) {
  const { concerts, user } = props;

  return (
    <>
      {concerts.map((concert, i) => {
        return <ConcertDetail key={i} concert={concert} user={user} />;
      })}
    </>
  );
}

export default ConcertList;
