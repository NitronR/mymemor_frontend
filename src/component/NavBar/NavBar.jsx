import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { getUserState } from "../../selectors";
import { connect } from "react-redux";
import { logoutUser } from "../../actions";
import { NavDropdown, Nav, Container, Navbar } from "react-bootstrap";

function NavBar({ user, logoutUser }) {
  /* if user is authenticated then go to memoline else landing page*/
  let brandLink = user.authenticated ? "/memoline" : "/";

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* brand */}
        <Navbar.Brand as={NavLink} to={brandLink}>
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

              {/* about nav */}
              <Nav.Link as={NavLink} to="/about">
                About
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
