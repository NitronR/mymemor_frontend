import "./LandingPage.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import React from "react";
import RedirectIf from "../../component/RedirectIf";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";

function LandingPage(props) {
  return (
    <div className="boundary-center">
      {/* Redirect to memoline if logged in */}
      <RedirectIf condition={props.user.authenticated} to="/memoline" />

      <Card id="landing-card">
        <h3>MyMemor</h3>
        <br />
        <span style={{ fontSize: "1.2rem" }}>The joy of memories</span>
        <br />
        <br />

        <Link to="/login">
          <Button className="button">Login</Button>
        </Link>

        <Link to="/register">
          <Button style={{ marginTop: "0.5rem" }} className="button">
            Register
          </Button>
        </Link>
      </Card>
    </div>
  );
}

const mapStateToProps = state => ({ user: getUserState(state) });

export default connect(mapStateToProps)(LandingPage);
