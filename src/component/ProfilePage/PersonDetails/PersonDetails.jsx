import { Button, Card } from "react-bootstrap";

import ApiService from "../../../service/ApiService";
import React from "react";
import { connect } from "react-redux";
import { setLoading } from "../../../actions";

class PersonDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isBonded: this.props.isBonded,
      isRequested: this.props.isRequested
    };

    this.handleBondRequest = this.handleBondRequest.bind(this);
  }
  render() {
    return (
      <Card>
        <Card.Body style={{ padding: "2rem" }}>
          <Card.Title>Details</Card.Title>

          {/* Current city */}
          <DetailsField label="Current city" value={this.props.currentCity} />

          {/* Hometown */}
          <DetailsField label="Hometown" value={this.props.hometown} />

          {/* School */}
          <DetailsField label="School" value={this.props.school} />

          {/* College */}
          <DetailsField label="College" value={this.props.college} />

          {/* Submit bond request button */}
          {!(this.state.isBonded || this.state.isRequested) && (
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "1rem" }}
            >
              <Button className="btn-primary" onClick={this.handleBondRequest}>
                Send Bond Request
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }
  handleBondRequest = async event => {
    event.preventDefault();
    // fetch data
    this.props.setLoading(true);

    try {
      let response = await ApiService.sendBondRequest(this.props.username);
      // throw if not ok
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      response = response.data;

      if (response.status === "success") {
        // set isRequested
        this.setState({ isRequested: true });
        // TODO show success
      } else {
        // TODO show error
      }
    } catch (e) {
      // TODO handle promise reject
    } finally {
      this.props.setLoading(false);
    }
  };
}

function DetailsField(props) {
  let value = props.value === "" ? "Not available" : props.value;
  return (
    <div style={{ marginTop: ".5rem" }}>
      <div className="font-weight-bold">{props.label}</div>
      <div>{value}</div>
    </div>
  );
}

export default connect(null, { setLoading })(PersonDetails);
