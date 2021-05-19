import React from "react";
import config from "../../config";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function AdminNavBar(props) {
  const { onLogout } = props;
  const festivalName = config.FESTIVAL_NAME;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Link to="/admin">{festivalName}</Link>
      </Navbar.Brand>

      <Nav className="mr-auto">
        <NavDropdown title="Menu" id="basic-nav-dropdown">
          <NavDropdown.Item variant="outline-success" onClick={onLogout}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default AdminNavBar;
