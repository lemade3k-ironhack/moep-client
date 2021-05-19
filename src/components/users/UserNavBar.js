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
      <Navbar className="color" expand="lg">
        <Navbar.Brand>
          {/* <Link to="/welcome">{festivalName}</Link> */}
          <Link to="/welcome">
            <img src="/IronH.png" />
          </Link>
        </Navbar.Brand>
      </Navbar>

      <Navbar className="color">
        <Navbar.Brand>
          <Link to="/welcome">
            <img src="/IronH.png" />
          </Link>{" "}
        </Navbar.Brand>
        <NavDropdown title={user.name} id="basic-nav-dropdown">
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
      </Navbar>

      <Navbar className="color " expand="sm">
        <Navbar.Brand>
          <Link to="/welcome">
            <img src="/IronH.png" />
          </Link>{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link>
              <Link to="/lineup">Lineup</Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link to="/timetable">Timetable</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default UserNavBar;
