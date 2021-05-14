import React from "react";
import { Link } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function StageList(props) {
  const {stages} = props

  return (
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
          {stages.map((stage) => (
            <TableRow key={stage.name}>
              <TableCell component="th" scope="row">
                {stage.name}
              </TableCell>
              <TableCell align="right">{stage.concerts.length}</TableCell>
              <TableCell align="right">
                <Link to={`/stage/${stage._id}/edit`}><EditIcon /></Link>
                <Link to={`/stage/${stage._id}/delete`}><DeleteIcon /></Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StageList;
