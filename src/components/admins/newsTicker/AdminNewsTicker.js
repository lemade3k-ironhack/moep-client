import React from "react";
import { Fab, Grid, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { NewsTicker, TickerNewForm } from "../..";

function AdminNewsTicker(props) {
  const { news, onNew, showNewForm, handleShowNewForm, error } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNews = {
      message: e.target.message.value,
      duration: e.target.duration.value,
    };
    onNew(newNews);
  };

  return (
    <Grid className="adminNewsTicker">
      <Typography component="h1" variant="h5">
        Ticker News
        {showNewForm ? (
          <TickerNewForm handleSubmit={handleSubmit} error={error} />
        ) : (
          <Fab
            className="actionIcon"
            size="small"
            color="primary"
            aria-label="add"
          >
            <AddIcon onClick={handleShowNewForm} />
          </Fab>
        )}
      </Typography>
      {!showNewForm &&
        (news ? <NewsTicker news={news} /> : <p className="noTickerNews">No current ticker news</p>)}
    </Grid>
  );
}

export default AdminNewsTicker;
