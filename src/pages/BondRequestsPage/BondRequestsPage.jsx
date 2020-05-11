import "./BondRequestsPage.css";

import { toastError, toastSuccess } from "../../utils/Toast";

import ApiService from "../../service/ApiService";
import PersonCard from "../ProfilePage/PersonCard/PersonCard";
import React from "react";
import RedirectIf from "../../component/RedirectIf/RedirectIf";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";
import { setLoading } from "../../actions";

class BondRequestsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bondRequests: []
    };

    this.handleReply = this.handleReply.bind(this);
    this.fetchBondRequests = this.fetchBondRequests.bind(this);
  }
  componentDidMount() {
    this.fetchBondRequests();
  }
  async fetchBondRequests() {
    // start loading
    this.props.setLoading(true);

    try {
      let response = await ApiService.getBondRequests();

      // throw if not ok
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      response = response.data;

      if (response.status === "success") {
        // update my people
        this.setState({ bondRequests: response.bondRequests });
      } else if (response.status === "error") {
        toastError(response.error);
      } else {
        toastError("Something went wrong");
      }
    } catch (e) {
        toastError(e.toString());
    } finally {
      // stop loading
      this.props.setLoading(false);
    }
  }
  render() {
    return (
      <div id="bond-requests-boundary">
        {/* Redirect to login if not logged in */}
        <RedirectIf condition={!this.props.user.authenticated} to="/login" />

        <div id="bond-requests-container" style={{ marginTop: "1rem" }}>
          <h3>Bond requests</h3>

          {/* Bond requests list */}
          <div id="bond-requests-list">
            {/* TODO show no bond requests */}
            {this.state.bondRequests.map(bondRequest => (
              <div style={{ padding: "0.3rem" }}>
                <PersonCard
                  profilePicURL={bondRequest.sender.profile_pic_url}
                  name={bondRequest.sender.name}
                  username={bondRequest.sender.username}
                  onAccept={() => this.handleReply(bondRequest.id, "accept")}
                  onDecline={() => this.handleReply(bondRequest.id, "decline")}
                  bondCard
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  async handleReply(bondRequestId, action) {
    // start loading
    this.props.setLoading(true);

    try {
      let response = await ApiService.bondRequestAction({
        bond_request_id: bondRequestId,
        action
      });
      // throw if not ok
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      response = response.data;

      if (response.status === "success") {
        // TODO show success
        toastSuccess(
          "Bond Request " +
            { accept: "accepted", decline: "declined" }[action] +
            "."
        );

        // remove bond request of given id
        this.setState({
          bondRequests: this.state.bondRequests.filter(
            bondRequest => bondRequest.id !== bondRequestId
          )
        });
      } else {
        // TODO show error
      }
    } catch (e) {
      // TODO handle promise reject
    } finally {
      this.props.setLoading(false);
    }
  }
}

const mapStateToProps = state => ({ user: getUserState(state) });

export default connect(mapStateToProps, { setLoading })(BondRequestsPage);
