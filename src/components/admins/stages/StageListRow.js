import React, { useState } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { StageEditForm } from "../../index";

function StageListRow(props) {
  const [showEditForm, updateShowEditForm] = useState(false);
  const { stage, error, onEdit, onDelete } = props;

  const handleUpdate = (stage) => {
    onEdit(stage);
    // ToDo: show form if validation errors
    if (!error) updateShowEditForm(false)
  };

  const handleShowEditForm = () => {
    updateShowEditForm(true) 
  };

  return (
    <TableRow key={stage.name}>
      <TableCell component="th" scope="row">
        {showEditForm ? (
          <StageEditForm onEdit={handleUpdate} stage={stage} error={error} />
        ) : (
          stage.name
        )}
      </TableCell>
      <TableCell align="right">{stage.concerts.length}</TableCell>
      <TableCell align="right">
        {!showEditForm ? <EditIcon onClick={handleShowEditForm} /> : ""}
        <DeleteIcon onClick={() => { onDelete(stage._id)  } }/>
      </TableCell>
    </TableRow>
  );
}

export default StageListRow;
