import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

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
            <Link to="/calendar">Timetable</Link>
          </NavDropdown.Item>

          <NavDropdown.Item>
            <Link to="/concerts">Lineup</Link>
          </NavDropdown.Item>

          <NavDropdown.Divider />
          <NavDropdown.Item>
            <Link variant="outline-success" onClick={onLogout}>
              Logout
            </Link>
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default Header;
