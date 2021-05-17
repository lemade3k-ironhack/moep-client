import React from "react";
import {
  makeStyles,
  Button,
  TextField,
  Grid,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function ConcertNewForm(props) {
  const { onSubmit, error } = props;
  const classes = useStyles();
  
  return (
    <form onSubmit={onSubmit} className={classes.form} noValidate="off">
      <Typography component="h1" variant="h5">
        Add new Concert
      </Typography>
      {error && (
        <Alert className={classes.alert} severity="error">
          {error.errorMessage}
        </Alert>
      )}
      <TextField
        name="bandname"
        label="Bandname"
        className={classes.input}
        variant="outlined"
        required
        fullWidth
        autoFocus
      />
      <Grid container justify="space-between">
        <TextField
          name="day"
          label="Day"
          type="date"
          defaultValue="2021-06-01"
          className={classes.picker}
          variant="outlined"
          required
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{inputProps: { min: "2021-06-01", max: "2021-06-04"} }}
        />
        <TextField
          name="starttime"
          label="Start time"
          type="time"
          defaultValue="14:00"
          className={classes.picker}
          variant="outlined"
          required
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
        <TextField
          name="endtime"
          label="Endtime time"
          type="time"
          defaultValue="16:00"
          className={classes.picker}
          variant="outlined"
          required
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 9000, //  15min
          }}
        />
      </Grid>
      <TextField
        className={classes.input}
        name="image"
        type="url"
        placeholder="https://"
        variant="outlined"
        fullWidth
        label="Band image"
        autoFocus
      />
      <TextField
        className={classes.input}
        name="description"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        label="Band description"
        autoFocus
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Add Concert
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
    padding: theme.spacing(3),
  },
  input: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  picker: {
    width: "30%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default ConcertNewForm;
