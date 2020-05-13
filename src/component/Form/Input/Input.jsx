import { Form, FormGroup } from "react-bootstrap";

import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);

    // initialize state
    this.state = {
      dirty: false,
    };
  }
  render() {
    return (
      <FormGroup controlId={this.props.name}>
        {/* Show label only if provided */}
        {this.props.label && <Form.Label>{this.props.label}</Form.Label>}
        <Form.Control
          isValid={
            this.state.dirty &&
            this.props.errors &&
            this.props.errors.length === 0
          }
          isInvalid={
            this.state.dirty &&
            this.props.errors &&
            this.props.errors.length !== 0
          }
          // When value is changed then mark field as dirty
          onChangeCapture={() => {
            this.setState({ dirty: true });
          }}
          {...this.props}
        />
        {/* display errors if field is dirty */}
        {this.state.dirty && (
          <Form.Control.Feedback type="invalid">
            {this.props.errors &&
              this.props.errors.map((error, idx) => (
                <div key={idx}>{error}</div>
              ))}
          </Form.Control.Feedback>
        )}
      </FormGroup>
    );
  }
}

export default Input;
