import axios from "axios";
import config from "../../config";
import { React, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { NewsTicker, UpcomingList, UserNavBar } from "../index";

function UserDashboard(props) {
  const { user, news, favorites, updateFavorite, onLogout } = props;
  const [upcomingHeader, updateUpcomingHeader] = useState("");
  const [upcoming, updateUpcoming] = useState([]);

  // fetch data on update
  useEffect(() => {
    // get upcoming favorites
    axios
      .get(`${config.API_URL}/api/upcoming/favorites`, {
        withCredentials: true,
      })
      .then((res) => {
        const upcomingFavorites = res.data;

        // if no upcoming favorites get next 5 concerts
        if (upcomingFavorites.length == 0) {
          axios
            .get(`${config.API_URL}/api/upcoming`, { withCredentials: true })
            .then((res) => {
              updateUpcoming(res.data);
              updateUpcomingHeader("Upcoming shows");
            });
        } else {
          updateUpcoming(upcomingFavorites);
          updateUpcomingHeader("Your favorites");
        }
      });
  }, [favorites]);

  if (!user) return <Redirect to={"/"} />;

  return (
    <>
      <UserNavBar onLogout={onLogout} user={user} />
      <div>
        <Grid className="container" container>
          <Grid item xs={12} className="trans radius content-padding">
            {news && <NewsTicker news={news} />}

            <UpcomingList
              user={user}
              concerts={upcoming}
              favorites={favorites}
              updateFavorite={updateFavorite}
              header={upcomingHeader}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default UserDashboard;
