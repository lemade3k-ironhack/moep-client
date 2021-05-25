import { Grid } from "@material-ui/core";
import React from "react";
import { Redirect } from "react-router";
import { ConcertDetail, UserNavBar } from "../../index";
import "./Concerts.css"

function ConcertList(props) {
  const { user, concerts, favorites, updateFavorite, onLogout } = props;

  if (!user) return <Redirect to={"/"} />;

  return (
    <div className="concertList">
      <UserNavBar onLogout={onLogout} />
      <div className="center margin content-padding">
        <Grid  container className="container">
          <Grid item xs={12} className="trans radius content-padding">
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
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ConcertList;
