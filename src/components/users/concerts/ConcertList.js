import React from "react";
import { Redirect } from "react-router";
import { ConcertDetail, UserNavBar } from "../../index";

function ConcertList(props) {
  const { user, concerts, favorites, updateFavorite, onLogout } = props;

  if (!user) return <Redirect to={"/"} />;

  return (
    <>
      <UserNavBar onLogout={onLogout} />
      <div className="center margin">
        <div className="content-padding">
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
        </div>
      </div>
    </>
  );
}

export default ConcertList;
