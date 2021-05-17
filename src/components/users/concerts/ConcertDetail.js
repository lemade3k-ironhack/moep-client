import React, { useEffect, useState } from "react";
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
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";

function ConcertDetail(props) {
  const { concert, user } = props;
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, updateIsFavorite] = useState(false)
  const classes = useStyles();

  const playtime = `${moment(concert.starttime).format("dddd LT")} - ${
     concert.stage.name
   }`;

   useEffect(() => {
     if (user.concerts.map((i) => i._id).includes(concert._id)) {
        updateIsFavorite(true)
     }
   }, [])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          className={classes.test}
          action={
            <IconButton aria-label="add to favorites">
               { isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
            </IconButton>
          }
          title={concert.bandname}
          subheader={playtime}
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
    //background: `blue`,
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
