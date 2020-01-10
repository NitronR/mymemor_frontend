import React from "react";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";
import { Redirect } from "react-router-dom";

// TODO
class MemolinePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memories: {}
    };
  }

  render() {
    return (
      <div>
        {/* Redirect to login if not logged in */}
        {!this.props.user.authenticated && <Redirect to="/login" />}

        <h1>Memoline</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps)(MemolinePage);
