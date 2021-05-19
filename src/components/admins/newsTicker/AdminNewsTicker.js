import React from "react";
import { Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
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
    <>
      <Typography component="h1" variant="h5">
        Ticker News
        {showNewForm ? (
          <TickerNewForm handleSubmit={handleSubmit} error={error} />
        ) : (
          <AddCircleIcon onClick={handleShowNewForm} />
        )}
      </Typography>
      {!showNewForm &&
        (news ? <NewsTicker news={news} /> : <p>No current ticker news</p>)}
    </>
  );
}

export default AdminNewsTicker;
