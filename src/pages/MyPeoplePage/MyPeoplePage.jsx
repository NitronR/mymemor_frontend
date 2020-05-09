import "./MyPeoplePage.css";

import ApiService from "../../service/ApiService";
import { Link } from "react-router-dom";
import PersonCard from "../ProfilePage/PersonCard";
import React from "react";
import RedirectIf from "../../component/RedirectIf";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";
import { setLoading } from "../../actions";

class MyPeoplePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myPeople: []
    };

    this.fetchMyPeople = this.fetchMyPeople.bind(this);
  }
  componentDidMount() {
    // fetch my people
    this.fetchMyPeople();
  }
  async fetchMyPeople() {
    // start loading
    this.props.setLoading(true);

    try {
      let response = await ApiService.getMyPeople();

      // throw if not ok
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      response = response.data;

      if (response.status === "success") {
        // update my people
        console.log(response.people);
        this.setState({ myPeople: response.people });
      } else if (response.status === "error") {
        // TODO show errors
      } else {
        // TODO something went wrong
      }
    } catch (e) {
      // TODO handle promise reject
    } finally {
      // stop loading
      this.props.setLoading(false);
    }
  }
  render() {
    return (
      <div id="my-people-boundary">
        {/* Redirect to login if not logged in */}
        <RedirectIf condition={!this.props.user.authenticated} to="/login" />

        <div id="my-people-container" style={{ marginTop: "1rem" }}>
          <h3>My People</h3>

          {/* MyPeople list */}
          <div id="my-people-list">
            {/* TODO show no MyPeople */}
            {this.state.myPeople.map(person => (
              <Link
                to={"/profile/" + person.username}
                style={{ padding: "0.1rem", textDecoration: "none" }}
              >
                <PersonCard
                  profilePicURL={person.profile_pic_url}
                  name={person.name}
                  username={person.username}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps, { setLoading })(MyPeoplePage);
