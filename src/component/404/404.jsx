import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./404.css";

function AboutPage() {
  return (
    <Card>  
      <h3>Page Not found</h3>
      <center><Link to="/">Return to Home Page</Link></center>
    </Card>
  );
}

export default AboutPage;

//  Todo : If the user is login it should goto memoline page else it goes to landing page 
