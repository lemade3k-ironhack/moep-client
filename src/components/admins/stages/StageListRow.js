import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

function StageListRow(props) {
  const { stage } = props;

  return (
    <TableRow key={stage.name}>
      <TableCell component="th" scope="row">
        {stage.name}
      </TableCell>
      <TableCell align="right">{stage.concerts.length}</TableCell>
      <TableCell align="right">
        <EditIcon />
        <DeleteIcon />
      </TableCell>
    </TableRow>
  );
}

export default StageListRow;
