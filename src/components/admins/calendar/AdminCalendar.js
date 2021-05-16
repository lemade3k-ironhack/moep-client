import axios from "axios";
import config from "../../../config";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import FullCalendar from "@fullcalendar/react";
import resourceCommonPlugin from "@fullcalendar/resource-common";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import {
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function AdminCalendar(props) {
  const [stage, updateStage] = useState({});
  const [error, updateError] = useState(null);
  const [concerts, updateConcerts] = useState([]);
  const { user } = props;
  const classes = useStyles();

  const festivalDateRange = { start: "2021-06-01", end: "2021-06-05" };
  const headerToolbar = { start: "", center: "title", end: "" };

  useEffect(() => {
    let stageName = props.match.params.stageName;

    axios
      .get(`${config.API_URL}/api/stage/${stageName}`, {
        withCredentials: true,
      })
      .then((res) => {
        updateStage(res.data);
        updateConcerts(
          res.data.concerts.map((concert) => {
            // map concerts to fullcalendar entries
            return {
              resourceId: stageName,
              title: concert.bandname,
              start: concert.starttime,
              end: concert.endtime,
            };
          })
        );
      })
      .catch((err) => updateError(err.response.data));
  }, []);

  if (!user) {
    return <Redirect to={"/"} />;
  } else if (user.role !== "admin") {
    return <Redirect to={"/welcome"} />;
  }
  if (!stage) return <CircularProgress />;
  return (
    <Grid className={classes.container} container spacing={3}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h5">
          {stage.name} - Concerts
        </Typography>
        {error && <Alert severity="error">{error.errorMessage}</Alert>}
        <FullCalendar
          plugins={[resourceCommonPlugin, resourceTimeGridPlugin]}
          initialView="resourceTimeGrid"
          validRange={festivalDateRange}
          visibleRange={festivalDateRange}
          headerToolbar={headerToolbar}
          allDaySlot={false}
          resources={[{ id: stage.name, title: " " }]}
          events={concerts}
        />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1200,
  },
}));

export default AdminCalendar;
