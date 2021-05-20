import React, { useState } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText } from "@material-ui/core";
import moment from "moment";
import Modal, { ModalProvider } from "styled-react-modal";
import { ConcertDetail } from "../../index";

function UpcomingList(props) {
  const { header, concerts, favorites, updateFavorite } = props;
  const [concert, updateConcert] = useState(null);
  const [showOpen, updateShowOpen] = useState(false);

  // helper function to toggle overlay
  const toggleShowOpen = () => {
    updateShowOpen(!showOpen);
  };

  // handle Click on ListItem
  const handleClick = (concert) => {
    updateConcert(concert);
    toggleShowOpen();
  };

  return (
    <div>
      <h2 className="center"> {header} </h2>
      <Link to={"/timetable"}>Timetable</Link>
      <Link to={"/lineup"}>Lineup</Link>
      <List>
        {concerts.map((concert, i) => {
          return (
            <ListItem
              key={i}
              onClick={() => {
                handleClick(concert);
              }}
            >
              <ListItemText
                primary={concert.bandname}
                secondary={`${moment(concert.starttime).format(
                  "yyyy-MM-DD"
                )} starts ${moment(concert.starttime).format("hh:mm A")} on ${
                  concert.stage.name
                }`}
              />
            </ListItem>
          );
        })}
      </List>
      {/* render show concert details as overlay */}
      {concert && (
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
      )}
    </div>
  );
}

const StyledModal = Modal.styled`

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export default UpcomingList;
