import React from "react";
import Card from "react-bootstrap/Card";
import "./RegisterPage.css";
import { Form } from "react-bootstrap";
import Input from "../Form/Input";
import checkUsername from "../../utils/Validation";
import ApiService from "../../service/ApiService";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form_data: {
        name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        hometown: "",
        current_city: "",
        school: "",
        college: ""
      },
      errors: {},
      formInvalid: true
    };
    this.handleInput = this.handleInput.bind(this);
  }

  render() {
    return (
      <div id="register-boundary">
        {/* Redirect to memoline if logged in */}
        {this.props.user.authenticated && <Redirect to="/memoline" />}

        <Card className="main-card">
          <Card.Title>
            {/* Register heading */}
            <h3>Register</h3>
          </Card.Title>
          <Card.Body>
            <Form
              id="register-form"
              onSubmit={this.register}
              className="text-left"
            >
              {/* Name field */}
              <Input
                name="name"
                label="Full Name"
                type="text"
                errors={this.state.errors.name}
                onChange={this.handleInput}
                required
              />

              {/* Username field */}
              <Input
                name="username"
                label="Username"
                type="text"
                errors={this.state.errors.username}
                onChange={this.handleInput}
                required
              />

              {/* Email field */}
              <Input
                name="email"
                label="Email"
                type="email"
                errors={this.state.errors.email}
                onChange={this.handleInput}
                required
              />

              {/* Password field */}
              <Input
                name="password"
                label="Password"
                type="password"
                errors={this.state.errors.password}
                onChange={this.handleInput}
                required
              />

              {/* Confirm Password field */}
              <Input
                name="confirm_password"
                label="Confirm password"
                type="password"
                errors={this.state.errors.confirm_password}
                onChange={this.handleInput}
                required
              />

              {/* Personal details heading */}
              <h6>
                <u>Personal details (Optional)</u>
              </h6>

              {/* Hometown field */}
              <Input
                name="hometown"
                label="Hometown"
                type="text"
                errors={this.state.errors.hometown}
                onChange={this.handleInput}
              />

              {/* Current city field */}
              <Input
                name="current_city"
                label="Current city"
                type="text"
                errors={this.state.errors.current_city}
                onChange={this.handleInput}
              />

              {/* School field */}
              <Input
                name="school"
                label="School"
                type="text"
                errors={this.state.errors.school}
                onChange={this.handleInput}
              />

              {/* College field */}
              <Input
                name="college"
                label="College"
                type="text"
                errors={this.state.errors.college}
                onChange={this.handleInput}
              />

              {/* Submit register */}
              <Form.Control
                type="submit"
                className="btn-primary"
                value="Register"
                required
              />
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }

  handleInput(event) {
    let name = event.target.name;
    let value = event.target.value;
    let errors = this.state.errors;

    errors[name] = [];

    switch (name) {
      case "username":
        // username should be in correct format
        let usernameError = checkUsername(value.trim());
        if (usernameError.length > 0) {
          errors[name].push(usernameError);
        }
        break;
      case "password":
        // password and confirm password should be same
        if (value.length < 8) {
          errors[name].push("Password should have at least 8 characters.");
        }

        // password and confirm password should be same
        if (value !== this.state.form_data.confirm_password) {
          errors["confirm_password"] = ["Passwords do not match."];
        } else {
          errors["confirm_password"] = [];
        }

        break;
      case "confirm_password":
        // password and confirm password should be same
        if (this.state.form_data.password !== value) {
          errors[name].push("Passwords do not match.");
        }
        break;
      // fields without validation
      default:
        delete errors[name];
    }

    // if even one error then return form is invalid
    let formInvalid = Object.keys(errors).some(field => {
      return errors[field].length !== 0;
    });

    this.setState(prevState => {
      return {
        form_data: {
          ...prevState.form_data,
          [name]: value
        },
        errors: errors,
        formInvalid: formInvalid
      };
    });
  }

  register = async event => {
    event.preventDefault();

    if (!this.state.formInvalid) {
      // send to api service and get response
      // TODO handle promise reject
      // TODO show loading
      ApiService.register(this.state.form_data).then(response => {
        response = response.data;
        if (response.status === "success") {
          // redirect to login
          // TODO show success
          this.props.history.push("/login");
        } else if (response.status === "error") {
          // show errors
          this.setState({ errors: response.errors });
        } else {
          // TODO something went wrong
        }
      });
    }
  };
}

const mapStateToProps = state => {
  let user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps)(RegisterPage);
