import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function StageNewForm(props) {
  const { handleSubmit, error } = props;

  return (
    <form onSubmit={handleSubmit} noValidate="off">
      {error && (
        <Alert className="alert" severity="error">
          {error.errorMessage}
        </Alert>
      )}
      <Grid container justify="space-between">
        <TextField
          name="name"
          label="Stage name"
          className="inputStageName"
          variant="outlined"
          required
          autoFocus
        />
        <Button
          type="submit"
          className="submit"
          variant="contained"
          color="primary"
        >
          Add Stage
        </Button>
        {/* ToDo: Add Cancel Button */}
      </Grid>
    </form>
  );
}

export default StageNewForm;
