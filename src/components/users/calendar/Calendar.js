import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { Redirect } from "react-router";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import scrollGridPlugin from "@fullcalendar/scrollgrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal, { ModalProvider } from "styled-react-modal";
import { ThemeProvider } from "styled-components";

function Calendar(props) {
  const { user, stages, concerts } = props;
  const classes = useStyles();
  const festivalStart = "2021-06-01";
  const festivalEnd = "2021-06-05";

  if (!user) return <Redirect to={"/"} />;

  console.log(concerts)
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

export default Calendar;
