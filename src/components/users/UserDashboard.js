import axios from "axios";
import config from "../../config";
import { React, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { UpcomingList } from "../index";
import { Grid } from "@material-ui/core";

function UserDashboard(props) {
  const { user, favorites, updateFavorite } = props;
  const [upcomingHeader, updateUpcomingHeader] = useState("");
  const [upcoming, updateUpcoming] = useState([]);
  const classes = useStyles();

  // fetch data on mount
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
          axios.get(`${config.API_URL}/api/upcoming`).then((res) => {
            updateUpcoming(res.data);
            updateUpcomingHeader("Next upcoming shows");
          });
        } else {
          updateUpcoming(upcomingFavorites);
          updateUpcomingHeader("Your next upcoming shows");
        }
      });
  }, [favorites]);

  if (!user) return <Redirect to={"/"} />;

  return (
    <Grid className={classes.container} container spacing={3}>
      <Grid item xs={12}>
        <h1>Hello {user.name}</h1>
        <UpcomingList
          user={user}
          concerts={upcoming}
          favorites={favorites}
          updateFavorite={updateFavorite}
          header={upcomingHeader}
        />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1000,
  },
}));

export default UserDashboard;
