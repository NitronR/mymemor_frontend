import "./ProfilePage.css";

import { getUserState, isLoading } from "../../selectors";

import ApiService from "../../service/ApiService";
import PersonCard from "./PersonCard";
import PersonDetails from "./PersonDetails";
import React from "react";
import RedirectIf from "../RedirectIf/RedirectIf";
import classNames from "classnames";
import { connect } from "react-redux";
import { setLoading } from "../../actions";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile_pic_url: "",
      name: "",
      username: this.props.match.params.profileUsername,
      hometown: "",
      current_city: "",
      school: "",
      college: "",
      is_bonded: "",
      is_requested: ""
    };
  }
  async componentDidMount() {
    this.props.setLoading(true);
    // fetch users
    // TODO handle promise reject
    try {
      let response = await ApiService.getProfile(this.state.username);

      // throw if not ok
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      
      response = response.data;

      if (response.status === "success") {
        // set profile data in state
        let profile = response.user;
        this.setState({ ...profile }, () => console.log(this.state));
      } else if (response.status === "error") {
        // set error
        this.setState({ error: response.error });
      } else {
        // TODO something went wrong
      }
    } catch (e) {
      // TODO handle promise reject
    } finally {
      this.props.setLoading(false);
    }
  }
  render() {
    return (
      <div className="boundary-center">
        {/* Redirect to login if not logged in */}
        <RedirectIf condition={!this.props.user.authenticated} to="/login" />

        {/* person card and details container */}

        <div
          className={classNames({
            "profile-cards": true,
            "d-none": !isLoading
          })}
        >
          <PersonCard
            profilePicURL={this.state.profile_pic_url}
            name={this.state.name}
            username={this.state.username}
          />
          <br />
          <PersonDetails
            username={this.state.username}
            currentCity={this.state.current_city}
            hometown={this.state.hometown}
            school={this.state.school}
            college={this.state.college}
            isBonded={this.state.is_bonded}
            isRequested={this.state.is_requested}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let user = getUserState(state),
    loading = isLoading(state);
  return { user, isLoading: loading };
};

export default connect(mapStateToProps, { setLoading })(ProfilePage);
