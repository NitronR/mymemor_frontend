import React from "react";
import Card from "react-bootstrap/Card";
import "./RegisterPage.css";
import { Form, FormGroup } from "react-bootstrap";

function RegisterPage() {
  return (
    <Card id="register-card">
      <Card.Body>
        <Card.Text>
          {/* Register heading */}
          <h3>Register</h3>
          <br />

          <Form id="register-form">
            {/* Name field */}
            <FormGroup controlId="name">
              <Form.Label>Enter name</Form.Label>
              <Form.Control type="text" className="text-field" />
            </FormGroup>

            {/* Username field */}
            <FormGroup controlId="username">
              <Form.Label>Enter username</Form.Label>
              <Form.Control type="text" className="text-field" required />
            </FormGroup>

            {/* Email field */}
            <FormGroup controlId="email">
              <Form.Label>Enter email</Form.Label>
              <Form.Control type="email" className="text-field" required />
            </FormGroup>

            {/* Password field */}
            <FormGroup controlId="password">
              <Form.Label>Enter password</Form.Label>
              <Form.Control type="password" className="text-field" required />
            </FormGroup>

            {/* Confirm Password field */}
            <FormGroup controlId="confirm-password">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control type="password" className="text-field" required />
            </FormGroup>

            {/* Personal details heading */}
            <h6>
              <u>Personal details (Optional)</u>
            </h6>

            {/* Hometown field */}
            <FormGroup controlId="hometown">
              <Form.Label>Enter hometown</Form.Label>
              <Form.Control type="text" className="text-field" required />
            </FormGroup>

            {/* Current city field */}
            <FormGroup controlId="current-city">
              <Form.Label>Enter current city</Form.Label>
              <Form.Control type="text" className="text-field" required />
            </FormGroup>

            {/* School field */}
            <FormGroup controlId="school">
              <Form.Label>Enter school</Form.Label>
              <Form.Control type="text" className="text-field" required />
            </FormGroup>

            {/* College field */}
            <FormGroup controlId="college">
              <Form.Label>Enter college</Form.Label>
              <Form.Control type="text" className="text-field" required />
            </FormGroup>

            {/* Submit register */}
            <Form.Control
              type="submit"
              required
              className="btn-primary"
              value="Register"
            />
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default RegisterPage;
