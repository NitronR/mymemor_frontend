import { loginUser, setLoading } from "../../actions";

import ApiService from "../../service/ApiService";
import React from "react";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";
import { withRouter } from "react-router-dom";

class SessionLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sessionLogin = this.sessionLogin.bind(this);
  }
  componentDidMount() {
    this.sessionLogin();
  }
  async sessionLogin() {
    // TODO
    // start loading
    this.props.setLoading(true);

    try {
      let response = await ApiService.getSessionUser();

      // throw if not ok
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      response = response.data;

      if (response.status === "success") {
        let username = response.username;

        this.props.loginUser({ username: username, authenticated: true });

        // redirect to memoline
        this.props.history.push("/memoline");
      } else {
        // TODO show error
      }
    } catch (e) {
      // TODO handle promise reject
    } finally {
      // stop loading
      this.props.setLoading(false);
    }
  }
  render() {
    return "";
  }
}

const mapStateToProps = state => {
  const user = getUserState(state);
  return { user };
};

export default withRouter(
  connect(mapStateToProps, { loginUser, setLoading })(SessionLogin)
);
