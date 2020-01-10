import React from "react";
import { connect } from "react-redux";
import { setLoading } from "../../../actions";
import { Card, Button } from "react-bootstrap";

class PersonDetails extends React.Component {
  constructor(props) {
    super(props);
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
          {!this.props.isBonded && (
            <div
              class="d-flex justify-content-center"
              style={{ marginTop: "1rem" }}
            >
              <Button variant="primary" onClick={this.handleBondRequest}>
                Send Bond Request
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    );
  }
  handleBondRequest() {
    // TODO send bond request
  }
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
