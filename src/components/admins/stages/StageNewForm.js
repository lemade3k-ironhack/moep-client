import React from "react";
import { makeStyles, Button, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function StageNewForm(props) {
  const { handleSubmit, error } = props;
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.form} noValidate="off">
      {error && (
        <Alert className={classes.alert} severity="error">
          {error.errorMessage}
        </Alert>
      )}
      <TextField
        name="name"
        variant="outlined"
        required
        fullWidth
        label="Stage name"
        autoFocus
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Add Stage
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default StageNewForm;
