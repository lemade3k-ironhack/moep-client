import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function SignUp(props) {
  const { festivalName, onSubmit, error } = props;
  const classes = useStyles();

  return (
    <Container maxWidth="xs" className="radius trans">
      <div className={classes.paper}>
        <Typography className="paddingtop" component="h1" variant="h3">
          {festivalName} - Planer
        </Typography>
        <Typography className={classes.description} variant="h5">
          YOUR FAVORITE FESTIVAL <br /> 20/05 - 23/05/2021
        </Typography>
        <Typography component="h2" variant="h5">
          Sign up
        </Typography>
      </div>
      <form onSubmit={onSubmit} className={classes.form} noValidate>
        {error && (
          <Alert className={classes.alert} severity="error">
            {error.errorMessage}
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              variant="outlined"
              required
              fullWidth
              label="Username"
              autoFocus
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="passwordConfirmation"
              label="Password Confirmation"
              type="password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to={"/"} className="linkDark ">
              Already signed up? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  description: {
    margin: theme.spacing(3),
    textAlign: "center",
    flexGrow: 1,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#6699cc",
  },
}));

export default SignUp;
