import axios from "axios";
import config from "../../../config";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import scrollGridPlugin from "@fullcalendar/scrollgrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal, { ModalProvider } from "styled-react-modal";
import { ThemeProvider } from "styled-components";
import {
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { ConcertNewForm } from "../../index";

function AdminCalendar(props) {
  const [stage, updateStage] = useState({});
  const [error, updateError] = useState(null);
  const [concerts, updateConcerts] = useState([]);
  const { user } = props;
  const classes = useStyles();

  // calendar settings
  const festivalDateRange = { start: "2021-06-01", end: "2021-06-05" };
  const headerToolbar = { start: "", center: "title", end: "addEventButton" };

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => { setIsOpen(!isOpen) };
  const addBtn = {
    addEventButton: {
      text: "Add Concert",
      click: () => {
        toggleModal();
      },
    },
  };

  useEffect(() => {
    let stageName = props.match.params.stageName;

    axios
      .get(`${config.API_URL}/api/stage/${stageName}`, {
        withCredentials: true,
      })
      .then((res) => {
        updateStage(res.data);
        updateConcerts(
          res.data.concerts.map((concert) => {
            // map concerts to fullcalendar entries
            return {
              resourceId: concert.stage,
              title: concert.bandname,
              start: concert.starttime,
              end: concert.endtime,
            };
          })
        );
      })
      .catch((err) => updateError(err.response.data));
  }, []);

  const handleNewConcert = (e) => {
    const newConcert = {
      bandname: e.target.bandname.value,
      day: e.target.day.value,
      starttime: e.target.starttime.value,
      endtime: e.target.endtime.value,
      description: e.target.description.value,
      image: e.target.image.value,
    };

    axios
      .post(`${config.API_URL}/api/stages/${stage.id}/concerts/create`, {
        newConcert
      })
      .then((res) => {
        console.log(res);
        updateConcerts([res.data, ...concerts]);
        updateError(null);
      })
      .catch((err) => {
        updateError(err.response.data)
      });

  };

  if (!user) {
    return <Redirect to={"/"} />;
  } else if (user.role !== "admin") {
    return <Redirect to={"/welcome"} />;
  }
  if (!stage) return <CircularProgress />;

  return (
    <Grid className={classes.container} container spacing={3}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h5">
          {stage.name} - Concerts
        </Typography>
        {error && <Alert severity="error">{error.errorMessage}</Alert>}

        <ThemeProvider theme={{}}>
          <ModalProvider>
            <StyledModal
              isOpen={isOpen}
              onBackgroundClick={toggleModal}
              onEscapeKeydown={toggleModal}
            >
              <ConcertNewForm onSubmit={handleNewConcert} isOpen={isOpen} error={error} />
            </StyledModal>
          </ModalProvider>
        </ThemeProvider>
        <FullCalendar
          plugins={[
            resourceTimeGridPlugin,
            scrollGridPlugin,
            interactionPlugin,
          ]}
          initialView="resourceTimeGrid"
          validRange={festivalDateRange}
          visibleRange={festivalDateRange}
          headerToolbar={headerToolbar}
          allDaySlot={false}
          dayMinWidth={260}
          height={"auto"}
          resources={[{ id: stage._id, title: " " }]}
          events={concerts}
          customButtons={addBtn}
        />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 1200,
  },
}));

const StyledModal = Modal.styled`
  width: 40rem;
  height: 40rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export default AdminCalendar;
