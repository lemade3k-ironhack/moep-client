import React, { useState } from 'react'
import { makeStyles, Button, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function StageEditForm(props) {
  const [stage, updateStage] = useState(props.stage)
  const { error, onEdit } = props;
  const classes = useStyles();

  const handleNameChange = (event) => {
    let text = event.target.value
    let clonedStage = JSON.parse(JSON.stringify(stage))
    clonedStage.name = text

    updateStage(clonedStage)
  }

  return (
    <>
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
        onChange={handleNameChange} 
        value={stage.name}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={ () => { onEdit(stage) } }
      >
        Update Stage
      </Button>
      {/* ToDo: Add Cancel Button */}
    </>
  )
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

export default StageEditForm
