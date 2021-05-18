import React from "react";
import { Redirect } from "react-router";
import { ConcertDetail, Header } from "../../index";

function ConcertList(props) {
  const { user, concerts, favorites, updateFavorite, onLogout } = props;

  if (!user) return <Redirect to={"/"} />;

  return (
    <>
      <Header onLogout={onLogout} />
      {concerts.map((concert, i) => {
        return (
          <ConcertDetail
            key={i}
            concert={concert}
            favorites={favorites}
            updateFavorite={updateFavorite}
          />
        );
      })}
    </>
  );
}

export default ConcertList;
