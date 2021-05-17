import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ThemeProvider,
} from "@material-ui/core";
import moment from "moment";
import Modal, { ModalProvider } from "styled-react-modal";
import { UpcomingDetail } from "../../index";

function UpcomingList(props) {
  const { concerts } = props;
  const [showOpen, updateShowOpen] = useState(false);

  // helper function to toggle overlay
  const toggleShowOpen = () => {
    updateShowOpen(!showOpen);
  };

  const handleClick = () => {
    toggleShowOpen();
  };

  return (
    <List>
      {concerts.map((concert, i) => {
        return (
          <div key={i}>
            <ListItem onClick={handleClick}>
              <ListItemText
                primary={concert.bandname}
                secondary={`${moment(concert.starttime).format(
                  "yyyy-MM-DD"
                )} starts ${moment(concert.starttime).format("hh:mm A")} on ${
                  concert.stage.name
                }`}
              />
            </ListItem>
            {/* render show concert details as overlay */}
            <ThemeProvider theme={{}}>
              <ModalProvider>
                <StyledModal
                  isOpen={showOpen}
                  onBackgroundClick={toggleShowOpen}
                  onEscapeKeydown={toggleShowOpen}
                >
                   <UpcomingDetail concert={concert}/>
                </StyledModal>
              </ModalProvider>
            </ThemeProvider>
          </div>
        );
      })}
    </List>
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

export default UpcomingList;
