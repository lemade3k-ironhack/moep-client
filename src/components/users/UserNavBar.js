import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import config from "../../config";
import "./UserNavBar.css";

function UserNavBar(props) {
  const { onLogout, user } = props;
  const festivalName = config.FESTIVAL_NAME;

  return (
    <div>
      <Navbar className="color" expand="sm" variant="dark">
        <Navbar.Brand>
          <Link to="/welcome">
            <img src="/IronH.png" />
          </Link>{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link>
              <Link to="/lineup" className="linkColor">
                Lineup
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link to="/timetable" className="linkColor">
                Timetable
              </Link>
            </Nav.Link>
            <Nav.Link onClick={onLogout}>
              <Link className="linkColor">Logout</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default UserNavBar;
