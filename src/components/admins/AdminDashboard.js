import axios from "axios";
import config from "../../config";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, CircularProgress } from "@material-ui/core/";
import { StageList } from "../index";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1200,
  },
}));

function AdminDashboard(props) {
  const [stages, updateStages] = useState([]);
  const classes = useStyles();

  // fetch stages on mount
  useEffect(() => {
    axios.get(`${config.API_URL}/api/stages`).then((res) => {
      updateStages(res.data);
    });
  }, []);

  if (!stages) {
    return <CircularProgress />;
  }

  return (
    <Grid className={classes.container} container spacing={3}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h5">
          Stages
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <StageList stages={stages} />
      </Grid>
    </Grid>
  );
}

export default AdminDashboard;
