import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="boundary-center">
      <Card id="landing-card">
        <h3>MyMemor</h3>
        <br />
        <span style={{ "fontSize": "1.2rem" }}>The joy of memories</span>
        <br />
        <br />

        <Link to="/login">
          <Button className="button">Login</Button>
        </Link>

        <Link to="/register">
          <Button style={{ "marginTop": "0.5rem" }} className="button">
            Register
          </Button>
        </Link>
      </Card>
    </div>
  );
}

export default LandingPage;
