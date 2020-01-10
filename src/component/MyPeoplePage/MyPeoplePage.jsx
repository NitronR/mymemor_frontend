import React from "react";
import Card from "react-bootstrap/Card";
import "./MyPeoplePage.css";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";
import { Redirect } from "react-router-dom";

function MyPeoplePage({user}) {
  return (
    <Card>
      {/* Redirect to login if not logged in */}
      {!user.authenticated && <Redirect to="/login" />}

      <h3>My People Page</h3>
    </Card>
  );
}

const mapStateToProps = state => {
  let user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps)(MyPeoplePage);
