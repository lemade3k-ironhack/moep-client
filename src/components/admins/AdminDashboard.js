import axios from "axios";
import config from "../../config";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core/";
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
  const [error, updateError] = useState(null);
  const [showNewForm, updateShowNewForm] = useState(false);
  const classes = useStyles();

  // fetch stages on mount
  useEffect(() => {
    axios.get(`${config.API_URL}/api/stages`).then((res) => {
      updateStages(res.data);
    });
  }, []);

  const handleNew = (name) => {
    axios
      .post(`${config.API_URL}/api/stage/create`, { name })
      .then((res) => {
        updateStages([res.data, ...stages]);
        updateError(null);
        updateShowNewForm(false);
      })
      .catch((err) => updateError(err.response.data));
  };

  const handleShowNewForm = () => {
    updateShowNewForm(true);
  };

  if (!stages) {
    return <CircularProgress />;
  }

  return (
    <Grid className={classes.container} container spacing={3}>
      <Grid item xs={12}>
        <StageList
          onNew={handleNew}
          showNewForm={showNewForm}
          handleShowNewForm={handleShowNewForm}
          error={error}
          stages={stages}
        />
      </Grid>
    </Grid>
  );
}

export default AdminDashboard;
