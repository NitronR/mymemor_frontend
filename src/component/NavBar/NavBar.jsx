import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

import { NavLink } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";
import { logoutUser } from "../../actions";

function NavBar({ user, logoutUser }) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* brand */}
        <Navbar.Brand as={NavLink} to="/">
          MyMemor
        </Navbar.Brand>

        {/* toggle button */}
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          {/* nav items */}
          {!user.authenticated && (
            <Nav className="ml-auto">
              {/* login nav */}
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>

              {/* register nav */}
              <Nav.Link as={NavLink} to="/register">
                Register
              </Nav.Link>
              
            </Nav>
          )}
          {user.authenticated && (
            <Nav className="ml-auto">
              {/* memoline nav */}
              <Nav.Link as={NavLink} to="/memoline">
                Memoline
              </Nav.Link>
              
              {/* profile nav */}
              <Nav.Link as={NavLink} to={"/profile/" + user.username}>
                Profile
              </Nav.Link>

              {/* MyPeople nav */}
              <Nav.Link as={NavLink} to="/my-people">
                MyPeople
              </Nav.Link>

              {/* MyPeople nav */}
              <Nav.Link as={NavLink} to="/bond-requests">
                Bond Requests
              </Nav.Link>

              {/* Username nav dropdown -> login */}
              <NavDropdown title={"@" + user.username} id="username-dropdown">
                <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = state => {
  let user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps, { logoutUser })(NavBar);
