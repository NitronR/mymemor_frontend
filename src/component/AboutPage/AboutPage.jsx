import React from "react";
import Card from "react-bootstrap/Card";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="boundary-center">
      <Card style={{ padding: "2rem" }}>
        <Card.Title>
          <h3>About page</h3>
        </Card.Title>
      </Card>
    </div>
  );
}

export default AboutPage;
