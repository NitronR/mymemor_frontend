import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./404.css";

function PageNotFound() {
  return (
    <Card>  
      <h3>Page Not found</h3>
      <center><Link to="/">Return to Home Page</Link></center>
    </Card>
  );
}

export default PageNotFound;

//  Todo : If the user is login it should goto memoline page else it goes to landing page 
