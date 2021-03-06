import "./MyPeoplePage.css";

import ApiService from "../../service/ApiService";
import { Link } from "react-router-dom";
import { MessageCard } from "../../component/MessageCard";
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
      myPeople: [],
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

        {/* If empty show empty message */}
        {this.state.myPeople.length === 0 ? (
          <MessageCard spaced>
            <h4>You have not added anybody.</h4>
          </MessageCard>
        ) : (
          <div className="main-section" style={{ marginTop: "1rem" }}>
            <h3>My People</h3>

            {/* MyPeople list */}
            <div style={{ marginTop: "1.5rem" }}>
              {/* TODO show no MyPeople */}
              {this.state.myPeople.map((person) => (
                <Link
                  to={"/profile/" + person.username}
                  style={{
                    textDecoration: "none",
                    lineHeight: 0,
                    fontSize: 0,
                  }}
                >
                  <PersonCard
                    person={person}
                    style={{ marginBottom: "0.7rem" }}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps, { setLoading })(MyPeoplePage);
