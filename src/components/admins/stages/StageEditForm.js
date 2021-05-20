import React, { useState } from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function StageEditForm(props) {
  const [stage, updateStage] = useState(props.stage);
  const { error, onEdit } = props;

  const handleNameChange = (event) => {
    let text = event.target.value;
    let clonedStage = JSON.parse(JSON.stringify(stage));
    clonedStage.name = text;

    updateStage(clonedStage);
  };

  return (
    <>
      {error && (
        <Alert className="alert" severity="error">
          {error.errorMessage}
        </Alert>
      )}
      <Grid className="editStageForm" container justify="space-between">
        <TextField
          name="name"
          label="Stage name"
          className="inputStageName"
          variant="outlined"
          required
          autoFocus
          onChange={handleNameChange}
          value={stage.name}
        />
        <Button
          className="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            onEdit(stage);
          }}
        >
          Update
        </Button>
        {/* ToDo: Add Cancel Button */}
      </Grid>
    </>
  );
}

export default StageEditForm;
