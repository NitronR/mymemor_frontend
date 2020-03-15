import { Form, FormGroup } from "react-bootstrap";

import React from "react";

class Input extends React.Component {
  render() {
    return (
      <FormGroup controlId={this.props.name}>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control
          isValid={this.props.errors && this.props.errors.length === 0}
          isInvalid={this.props.errors && this.props.errors.length !== 0}
          {...this.props}
        />
        {/* for displaying errors */}
        <Form.Control.Feedback type="invalid">
          {this.props.errors &&
            this.props.errors.map((error, idx) => <div key={idx}>{error}</div>)}
        </Form.Control.Feedback>
      </FormGroup>
    );
  }
}

export default Input;
