import axios from "axios";
import config from "../../config";
import { React, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { UpcomingList } from "../index"
import { Grid } from "@material-ui/core";

function UserDashboard(props) {
  const { user } = props;
  const [upcoming, updateUpcoming] = useState([]);
  const classes = useStyles();

  // fetch data on mount
  useEffect(() => {
    //get upcoming concerts
    axios.get(`${config.API_URL}/api/upcoming`).then((response) => {
      updateUpcoming(response.data);
    });
  }, []);

  if (!user) return <Redirect to={"/"} />;

  return (
    <Grid className={classes.container} container spacing={3}>
      <Grid item xs={12}>
        <h1>Hello {user.name}</h1>
        <Link to={"/concerts"}>Lineup</Link>
        <Link to={"/calendar"}>Calendar</Link>
        <UpcomingList concerts={upcoming} user={user} />
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
