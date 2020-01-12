import "./SearchPage.css";

import Card from "react-bootstrap/Card";
import React from "react";
import RedirectIf from "../RedirectIf/RedirectIf";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";

function SearchPage(props) {
  return (
    <Card>
      {/* Redirect to login if not logged in */}
          <RedirectIf condition={!props.user.authenticated} to="/login" />
    </Card>
  );
}

const mapStateToProps = state => {
  let user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps)(SearchPage);
