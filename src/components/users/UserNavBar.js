import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import config from "../../config";

function UserNavBar(props) {
  const { onLogout } = props;
  const festivalName = config.FESTIVAL_NAME;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link to="/welcome">{festivalName}</Link>
      </Navbar.Brand>

      <Nav className="mr-auto">
        <NavDropdown title="Menu" id="basic-nav-dropdown">
          <NavDropdown.Item>
            <Link to="/timetable">Timetable</Link>
          </NavDropdown.Item>

          <NavDropdown.Item>
            <Link to="/lineup">Lineup</Link>
          </NavDropdown.Item>

          <NavDropdown.Divider />
          <NavDropdown.Item variant="outline-success" onClick={onLogout}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default UserNavBar;
