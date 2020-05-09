import "./404.css";

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import React from "react";

function PageNotFound() {
  return (
    <div class="boundary-center">
      <Card>
        <Card.Body>
          <Card.Title>Page Not found</Card.Title>
          <Link to="/">Return to Home Page</Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PageNotFound;

//  Todo : If the user is login it should goto memoline page else it goes to landing page
