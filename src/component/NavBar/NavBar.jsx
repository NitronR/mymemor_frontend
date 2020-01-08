import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">MyMemor</Navbar.Brand>
      <Navbar.Toggle aria-controls="main-nav" />
      <Navbar.Collapse id="main-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Link to="about">About</Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
