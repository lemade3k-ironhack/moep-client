import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React from "react";

function ConcertDetail(props) {
  const { stageName, concert, onDelete } = props;
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <CardMedia
        component="img"
        height="300"
        alt={`${concert.title}-image`}
        src={concert.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {concert.bandname}
        </Typography>
        <Typography gutterBottom variant="body2">
          {moment(concert.starttime).format("yyyy-MM-DD")} from{" "}
          {moment(concert.starttime).format("hh:mm A")} to{" "}
          {moment(concert.enttime).format("hh:mm A")} on {stageName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {concert.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          delete
        </Button>
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles({
  container: {
    minHeight: "35rem",
    minWidth: "35rem",
    margin: "auto"
  }
})

export default ConcertDetail;
