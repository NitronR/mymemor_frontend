import React from "react";
import { FormGroup, Form } from "react-bootstrap";

class Input extends React.Component {
  render() {
    return (
      <FormGroup controlId={this.props.name}>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control
          name={this.props.name}
          type={this.props.type}
          onChange={this.props.onChange}
          value={this.props.value}
          required={this.props.required}
          isValid={this.props.errors && this.props.errors.length === 0}
          isInvalid={this.props.errors && this.props.errors.length !== 0}
        />
        {/* for displaying errors */}
        <Form.Control.Feedback type="invalid">
          {this.props.errors &&
            this.props.errors.map(error => <div>{error}</div>)}
        </Form.Control.Feedback>
      </FormGroup>
    );
  }
}

export default Input;
