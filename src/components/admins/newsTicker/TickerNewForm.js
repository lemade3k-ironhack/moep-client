import React from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function TickerNewForm(props) {
  const { handleSubmit, error } = props;

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert className="alert" severity="error">
          {error.errorMessage}
        </Alert>
      )}
      <Grid container justify="space-between">
        <TextField
          name="message"
          label="Ticker message"
          className="inputTickerMessage"
          variant="outlined"
          required
          autoFocus
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="duration"
          label="Duration in minutes"
          type="number"
          defaultValue={60}
          className="inputTickerDuration"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: { min: 1, max: 1440 } }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="submit"
        >
          Add News
        </Button>
        {/* ToDo: Add Cancel Button */}
      </Grid>
    </form>
  );
}

export default TickerNewForm;
