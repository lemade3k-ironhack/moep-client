import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

function Header(props) {
  const { onLogout } = props;
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link to="/welcome">moep</Link>
      </Navbar.Brand>

      <Nav className="mr-auto">
        <NavDropdown title="Menu" id="basic-nav-dropdown">
          <NavDropdown.Item>
            <Link to="/timetable">Timetable</Link>
          </NavDropdown.Item>

          <NavDropdown.Item>
            <Link to="/concerts">Lineup</Link>
          </NavDropdown.Item>

          <NavDropdown.Item>
            <Link to="/">generell Information</Link>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>
            <Button variant="outline-success" onClick={onLogout}>
              Logout
            </Button>
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default Header;
