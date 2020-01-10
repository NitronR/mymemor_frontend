import React from "react";
import Card from "react-bootstrap/Card";
import "./ProfilePage.css";
import { getUserState } from "../../selectors";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function ProfilePage({ user }) {
  return (
    <div className="boundary-center">
      {/* Redirect to login if not logged in */}
      {!user.authenticated && <Redirect to="/login" />}
      <Card style={{ padding: "2rem" }}>
        <Card.Title>
          <h3>My profile</h3>
        </Card.Title>
      </Card>
    </div>
  );
}

const mapStateToProps = state => {
  let user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps)(ProfilePage);
