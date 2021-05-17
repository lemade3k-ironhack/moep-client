import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    axios.get("http://localhost:5005/api/upcoming").then((response) => {
      updateUpcoming(response.data);
    });
  }, []);

  return (
    <Grid className={classes.container} container spacing={3}>
      <Grid item xs={12}>
        <h1>Hello {user.name}</h1>
        <Link to={"/concerts"}>Lineup</Link>
        <UpcomingList concerts={upcoming} />
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
