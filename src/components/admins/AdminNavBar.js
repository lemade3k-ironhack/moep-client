import React from "react";
import config from "../../config";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function AdminNavBar(props) {
  const { user, onLogout } = props;
  const festivalName = config.FESTIVAL_NAME;

  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Brand>
        <Link to="/admin">{festivalName} Planer - Admin CMS</Link>
      </Navbar.Brand>

      <Nav>
        <Nav.Link variant="outline-success" onClick={onLogout}>
          Logout {user.name}
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default AdminNavBar;
