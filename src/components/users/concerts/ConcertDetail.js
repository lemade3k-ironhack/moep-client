import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";

function ConcertDetail(props) {
  const { concert } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //playtime= day, playtime2= day + time + stage
  //  const playtime = moment(concert.day).format("dddd");
  const playtime2 =
    moment(concert.day).format("dddd") +
    " " +
    moment(concert.day).format("LT") +
    " - " +
    concert.stage;

  return (
    <div className="center">
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          }
          title={concert.bandname}
          subheader={playtime2}
        />
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CardMedia
              className={classes.media}
              image={concert.image}
              title={concert.bandname}
            />

            <Typography paragraph></Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {concert.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default ConcertDetail;
