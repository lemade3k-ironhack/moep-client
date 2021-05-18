import React from "react";
import { makeStyles, Button, TextField, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function TickerNewForm(props) {
  const { handleSubmit, error } = props;
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      {error && (
        <Alert className={classes.alert} severity="error">
          {error.errorMessage}
        </Alert>
      )}
      <Grid container justify="space-between">
        <TextField
          name="message"
          label="Ticker message"
          className={classes.message}
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
          className={classes.duration}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: { min: 1, max: 1440 } }}
        />
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Add News
      </Button>
      {/* ToDo: Add Cancel Button */}
    </form>
  );
}

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(3),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  message: {
    width: "75%",
  },
  duration: {
    width: "24%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default TickerNewForm;
