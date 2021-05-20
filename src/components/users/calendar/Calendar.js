import axios from "axios";
import config from "../../../config";
import React, { useState } from "react";
import { Redirect } from "react-router";
import { Grid } from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import scrollGridPlugin from "@fullcalendar/scrollgrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal, { ModalProvider } from "styled-react-modal";
import { UserNavBar, ConcertDetail } from "../../index";
import "./Calendar.css";

function Calendar(props) {
  const { user, stages, concerts, favorites, updateFavorite, onLogout } = props;
  const [showOpen, updateShowOpen] = useState(false);
  const [concert, updateConcert] = useState(null);
  const festivalStart = config.FESTIVAL_START_DATE;
  const festivalEnd = config.FESTIVAL_END_DATE;

  // helper function to toggle overlay
  const toggleShowOpen = () => {
    updateShowOpen(!showOpen);
  };

  // get concert when calender event is clicked
  const handleEventClick = (calendar) => {
    const bandname = calendar.event._def.title;

    axios
      .get(`${config.API_URL}/api/concerts/${bandname}`, {
        withCredentials: true,
      })
      .then((res) => {
        updateConcert(res.data);
        toggleShowOpen();
      });
  };

  if (!user) return <Redirect to={"/"} />;

  return (
    <>
      <UserNavBar onLogout={onLogout} />
      <Grid className="calendar trans content-padding" container spacing={3}>
        <Grid item xs={12}>
          <h2 className="center">Timetable</h2>
          <FullCalendar
            plugins={[
              resourceTimeGridPlugin,
              scrollGridPlugin,
              interactionPlugin,
            ]}
            initialView="resourceTimeGridDay"
            validRange={{ start: festivalStart, end: festivalEnd }}
            visibleRange={{ start: festivalStart, end: festivalEnd }}
            headerToolbar={{ start: "title", center: "", end: "prev,next" }}
            allDaySlot={false}
            dayMinWidth={258}
            height={"auto"}
            eventColor="#0e2a30"
            eventBorderColor="#0e2a30"
            eventTextColor="#d7d7d7"
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
    </>
  );
}

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export default Calendar;
