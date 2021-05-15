import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { StageListRow, StageNewForm } from "../../index";

function StageList(props) {
  const {
    stages,
    error,
    onNew,
    showNewForm,
    handleShowNewForm,
    onEdit,
    onDelete,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    onNew(e.target.name.value);
  };

  const handleUpdate = (stage) => {
    onEdit(stage);
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Stages
        {showNewForm ? (
          <StageNewForm handleSubmit={handleSubmit} error={error} />
        ) : (
          <AddCircleIcon onClick={handleShowNewForm} />
        )}
      </Typography>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Stage name</TableCell>
              <TableCell align="right">Concerts</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stages.map((stage, i) => {
              return (
                <StageListRow
                  key={i}
                  error={error}
                  stage={stage}
                  onEdit={handleUpdate}
                  onDelete={onDelete}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default StageList;
