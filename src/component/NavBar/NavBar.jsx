import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      {/* brand */}
      <Navbar.Brand as={NavLink} to="/">
        MyMemor
      </Navbar.Brand>

      {/* toggle button */}
      <Navbar.Toggle aria-controls="main-nav" />

      {/* nav items */}
      <Navbar.Collapse id="main-nav">
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
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
