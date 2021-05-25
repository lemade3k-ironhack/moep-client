import axios from "axios";
import config from "../../config";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { AdminNavBar, AdminNewsTicker, StageList } from "../index";
import { Grid, CircularProgress } from "@material-ui/core/";
import "./Admin.css";

function AdminDashboard(props) {
  const {
    user,
    news,
    onNewTicker,
    showNewTickerForm,
    handleShowNewTickerForm,
    onLogout,
  } = props;
  const [stages, updateStages] = useState([]);
  const [showNewForm, updateShowNewForm] = useState(false);
  const [error, updateError] = useState(null);

  // fetch stages on mount
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/stages`, { withCredentials: true })
      .then((res) => {
        updateStages(res.data);
      });
  }, []);

  const handleNewStage = (name) => {
    axios
      .post(
        `${config.API_URL}/api/stage/create`,
        { name },
        { withCredentials: true }
      )
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
      .patch(
        `${config.API_URL}/api/stage/${stage._id}/update`,
        { name: stage.name },
        { withCredentials: true }
      )
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
      .delete(`${config.API_URL}/api/stage/${stageId}/delete`, {
        withCredentials: true,
      })
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
  } else if (!user.admin) {
    return <Redirect to={"/welcome"} />;
  }
  if (!stages) return <CircularProgress />;

  return (
    <Grid container spacing={8} className="admin">
      <AdminNavBar user={user} onLogout={onLogout} />
      <Grid item xs={12}>
        <AdminNewsTicker
          news={news}
          onNew={onNewTicker}
          showNewForm={showNewTickerForm}
          handleShowNewForm={handleShowNewTickerForm}
          error={error}
        />
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

export default AdminDashboard;
