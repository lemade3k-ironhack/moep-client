import React from "react";
import { Redirect } from "react-router";
import { ConcertDetail, UserNavBar } from "../../index";

function ConcertList(props) {
  const { user, concerts, favorites, updateFavorite, onLogout } = props;

  if (!user) return <Redirect to={"/"} />;

  return (
    <>
      <UserNavBar onLogout={onLogout} user={user} />
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
