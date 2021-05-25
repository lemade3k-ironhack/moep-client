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
import { BaseModalBackground } from "styled-react-modal";

function ConcertDetail(props) {
  const { concert, favorites, updateFavorite } = props;
  const [expanded, setExpanded] = useState(false);
  const [isFavorite, updateIsFavorite] = useState(false);
  const classes = useStyles();

  const playtime = `${moment(concert.starttime).format("dddd LT")} - ${
    concert.stage.name
  }`;

  useEffect(() => {
    favorites.some((i) => i._id == concert._id)
      ? updateIsFavorite(true)
      : updateIsFavorite(false);
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="concertDetail">
      <Card className={classes.root}>
        <CardMedia image={concert.image} title={concert.bandname}>
          <CardHeader
            className={classes.header}
            action={
              <IconButton
                className={classes.favIcon}
                onClick={() => {
                  updateFavorite(concert);
                }}
                aria-label="toggle favorites"
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            }
            title={concert.bandname}
          />
        </CardMedia>
        <CardActions className={classes.actions} disableSpacing>
          <Typography variant="p" component="p" color="#d7d7d7">
            {playtime}
          </Typography>
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
        <Collapse
          className={classes.collapse}
          in={expanded}
          timeout="auto"
          unmountOnExit
        >
          <CardContent className="pt-0">
            <Typography
              className="scroll-box pt-0"
              variant="body2"
              component="p"
            >
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
    maxWidth: "488px",
    minWidth: "300px",
    margin: "0 auto 8px auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  header: {
    minHeight: "100px",
    paddingBottom: "0px",
    color: "#d7d7d7",
    textShadow:
      "-1px 1px 4px black, 1px 1px 4px black, 1px 1px 4px black, 1px -1px 4px black",
  },
  favIcon: {
    color: "#6699CC",
  },
  actions: {
    paddingTop: "0px",
    backgroundColor: "#0e2a30",
    color: "#d7d7d7",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    color: "#d7d7d7",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  collapse: {
    backgroundColor: "#0e2a30",
    color: "#d7d7d7",
  },
}));

export default ConcertDetail;
