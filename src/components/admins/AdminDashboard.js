import axios from "axios";
import config from "../../config";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core/";
import { StageList } from "../index";
import { Redirect } from "react-router";

function AdminDashboard(props) {
  const { user } = props;
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

  const handleNewStage = (name) => {
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

  const handleEdit = (stage) => {
    axios
      .patch(`${config.API_URL}/api/stage/${stage._id}/update`, {
        name: stage.name,
      })
      .then(() => {
        let updatedStages = stages.map((singleStage) => {
          if (stage._id === singleStage._id) {
            singleStage.name = stage.name;
          }
          return singleStage;
        });
        updateStages(updatedStages);
        updateError(null);
      })
      .catch((err) => updateError(err.response.data));
  };

  const handleDelete = (stageId) => {
    axios
      .delete(`${config.API_URL}/api/stage/${stageId}/delete`)
      .then(() => {
        let filteredStages = stages.filter((stage) => {
          return stage._id !== stageId;
        });
        updateStages(filteredStages);
      })
      .catch((err) => updateError(err.response.data));
  };

  if (!user) {
    return <Redirect to={"/"} />;
  } else if (user.role !== "admin") {
    return <Redirect to={"/welcome"} />;
  }
  if (!stages) return <CircularProgress />;

  return (
    <Grid className={classes.container} container spacing={3}>
      <Grid item xs={12}>
        <StageList
          onNew={handleNewStage}
          showNewForm={showNewForm}
          handleShowNewForm={handleShowNewForm}
          onEdit={handleEdit}
          onDelete={handleDelete}
          error={error}
          stages={stages}
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

export default AdminDashboard;
