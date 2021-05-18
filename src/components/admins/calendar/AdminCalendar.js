import axios from "axios";
import config from "../../../config";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import scrollGridPlugin from "@fullcalendar/scrollgrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal, { ModalProvider } from "styled-react-modal";
import {
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ConcertNewForm, AdminConcertDetail, AdminNavBar } from "../../index";

function AdminCalendar(props) {
  const { user, onLogout } = props;
  const [stage, updateStage] = useState({});
  const [error, updateError] = useState(null);
  const [concerts, updateConcerts] = useState([]);
  const [newFormOpen, updateNewFormOpen] = useState(false);
  const [dateOnNew, updateDateOnNew] = useState("");
  const [showOpen, updateShowOpen] = useState(false);
  const [concert, updateConcert] = useState(null);
  const classes = useStyles();
  const festivalStart = "2021-06-01";
  const festivalEnd = "2021-06-05";

  // get all concerts on mount
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

  // helper function to toggle overlay
  const toggleNewForm = () => {
    updateNewFormOpen(!newFormOpen);
  };

  // toggle new form when calendar date is clicked
  const handleDateClick = (calendar) => {
    updateDateOnNew(calendar.dateStr);
    toggleNewForm();
  };

  // create new concert after submitting the form
  const handleNewConcert = (e) => {
    e.preventDefault();
    const starttime = new Date(
      `${e.target.day.value}T${e.target.starttime.value}`
    );
    const endtime = new Date(`${e.target.day.value}T${e.target.endtime.value}`);

    axios
      .post(`${config.API_URL}/api/stages/${stage.id}/concerts/create`, {
        bandname: e.target.bandname.value,
        starttime: starttime,
        endtime: endtime,
        description: e.target.description.value,
        image: e.target.image.value,
      })
      .then((res) => {
        const { data } = res;
        // map new concert to fullcalendar entriy
        const newConcert = {
          resourceId: data.stage,
          title: data.bandname,
          start: data.starttime,
          end: data.endtime,
        };

        updateConcerts([newConcert, ...concerts]);
        updateError(null);
        toggleNewForm();
      })
      .catch((err) => {
        updateError(err.response.data);
      });
  };

  // helper function to toggle overlay
  const toggleShowOpen = () => {
    updateShowOpen(!showOpen);
  };

  // get concert when calender event is clicked
  const handleEventClick = (calendar) => {
    const bandname = calendar.event._def.title;

    axios.get(`${config.API_URL}/api/concerts/${bandname}`).then((res) => {
      updateConcert(res.data);
      toggleShowOpen();
    });
  };

  const handleDelete = (concertId) => {
    axios
      .delete(`${config.API_URL}/api/concerts/${concertId}/delete`)
      .then((deleted) => {
        let filtered = concerts.filter(
          (concert) => concert.title !== deleted.bandname
        );
        updateConcerts(filtered);
        updateError(null);
        toggleShowOpen();
      })
      .catch((err) => updateError(err.response.data));
  };

  if (!user) {
    return <Redirect to={"/"} />;
  } else if (user.role !== "admin") {
    return <Redirect to={"/welcome"} />;
  }
  if (!stage) return <CircularProgress />;

  return (
    <Grid className={classes.container} container spacing={3}>
      <AdminNavBar onLogout={onLogout} />
      <Grid item xs={12}>
        <Typography component="h1" variant="h5">
          {stage.name} - Concerts
        </Typography>
        <FullCalendar
          plugins={[
            resourceTimeGridPlugin,
            scrollGridPlugin,
            interactionPlugin,
          ]}
          initialView="resourceTimeGrid"
          validRange={{ start: festivalStart, end: festivalEnd }}
          visibleRange={{ start: festivalStart, end: festivalEnd }}
          headerToolbar={{ start: "", center: "title", end: "" }}
          allDaySlot={false}
          dayMinWidth={260}
          height={"auto"}
          resources={[{ id: stage.id, title: " " }]}
          events={concerts}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
        {/* render new form as overlay */}
        <ModalProvider>
          <StyledModal
            isOpen={newFormOpen}
            onBackgroundClick={toggleNewForm}
            onEscapeKeydown={toggleNewForm}
          >
            <ConcertNewForm
              festivalStart={festivalStart}
              festivalEnd={festivalEnd}
              dateOnNew={dateOnNew}
              onSubmit={handleNewConcert}
              error={error}
            />
          </StyledModal>
        </ModalProvider>
        {/* render show concert details as overlay */}
        <ModalProvider>
          <StyledModal
            isOpen={showOpen}
            onBackgroundClick={toggleShowOpen}
            onEscapeKeydown={toggleShowOpen}
          >
            <AdminConcertDetail
              stageName={stage.name}
              concert={concert}
              onDelete={handleDelete}
            />
          </StyledModal>
        </ModalProvider>
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
