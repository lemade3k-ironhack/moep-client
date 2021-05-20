import axios from "axios";
import config from "../../config";
import { React, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { NewsTicker, UpcomingList, UserNavBar } from "../index";
import "./UserNavBar.css";

function UserDashboard(props) {
  const { user, news, favorites, updateFavorite, onLogout } = props;
  const [upcomingHeader, updateUpcomingHeader] = useState("");
  const [upcoming, updateUpcoming] = useState([]);
  const classes = useStyles();

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
        <Grid className={classes.container} container>
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

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "600px",
    background: "rgba (0, 0, 0, 0.5)",
  },
}));

export default UserDashboard;
