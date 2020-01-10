import React from "react";
import Card from "react-bootstrap/Card";
import "./SearchPage.css";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";
import { Redirect } from "react-router-dom";

function SearchPage() {
  return (
    <Card>
      {/* Redirect to login if not logged in */}
      {!this.props.user.authenticated && <Redirect to="/login" />}

      <h3>Search Page</h3>
    </Card>
  );
}

const mapStateToProps = state => {
  let user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps)(SearchPage);
