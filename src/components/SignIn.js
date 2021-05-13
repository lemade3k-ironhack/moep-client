import React from "react";
import {
  makeStyles,
  Avatar,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: theme.spacing(3)
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
  },
}));

function SignIn(props) {
  const { onSubmit, error } = props;
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar
          className={classes.avatar}
          src="/public/logo512.png"
          alt="moep-avatar"
        />
        <Typography component="h1" variant="h3">
          MOEP
        </Typography>
        <Typography className={classes.description}>
          Nullam accumsan lorem in dui. Nulla porta dolor. Etiam imperdiet
          imperdiet orci.
        </Typography>
        <Typography component="h2" variant="h5">
          Sign Up
        </Typography>
      </div>
      <form onSubmit={onSubmit} className={classes.form} noValidate>
        {error && <Alert className={classes.alert} severity="error">{error.errorMessage}</Alert>}
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
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="/signup">
              No account yet? Sign up
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignIn;
