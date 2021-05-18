import axios from "axios";
import config from "../../../config";
import React, { useState } from "react";
import { Redirect } from "react-router";
import { Grid, makeStyles } from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import scrollGridPlugin from "@fullcalendar/scrollgrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal, { ModalProvider } from "styled-react-modal";
import ConcertDetail from "../concerts/ConcertDetail";

function Calendar(props) {
  const { user, stages, concerts, favorites, updateFavorite } = props;
  const [showOpen, updateShowOpen] = useState(false);
  const [concert, updateConcert] = useState(null);
  const classes = useStyles();
  const festivalStart = "2021-06-01";
  const festivalEnd = "2021-06-05";

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

  if (!user) return <Redirect to={"/"} />;

  return (
    <Grid className={classes.container} container spacing={3}>
      <Grid item xs={12}>
        <FullCalendar
          plugins={[
            resourceTimeGridPlugin,
            scrollGridPlugin,
            interactionPlugin,
          ]}
          initialView="resourceTimeGridDay"
          validRange={{ start: festivalStart, end: festivalEnd }}
          visibleRange={{ start: festivalStart, end: festivalEnd }}
          headerToolbar={{ start: "", center: "title", end: "prev,next" }}
          allDaySlot={false}
          dayMinWidth={260}
          height={"auto"}
          resources={stages}
          events={concerts}
          eventClick={handleEventClick}
        />
        {/* render show concert details as overlay */}
        <ModalProvider>
          <StyledModal
            isOpen={showOpen}
            onBackgroundClick={toggleShowOpen}
            onEscapeKeydown={toggleShowOpen}
          >
            <ConcertDetail
              concert={concert}
              favorites={favorites}
              updateFavorite={updateFavorite}
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
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export default Calendar;
