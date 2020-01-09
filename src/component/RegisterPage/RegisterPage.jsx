import React from "react";
import Card from "react-bootstrap/Card";
import "./RegisterPage.css";
import { Form } from "react-bootstrap";
import Input from "../Form/Input";
import checkUsername from "../../utils/Validation";
import ApiService from "../../service/ApiService";

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
      isLoading: false,
      errors: {},
      formInvalid: true
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    let name = e.target.name;
    let value = e.target.value;
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

  render() {
    return (
      <Card id="register-card">
        <Card.Body>
          <Card.Text>
            {/* Register heading */}
            <h3>Register</h3>
            <br />

            <Form id="register-form" onSubmit={this.register}>
              {/* Name field */}
              <Input
                name="name"
                label="Enter name"
                type="text"
                errors={this.state.errors.name}
                onChange={this.handleInput}
                required
              />

              {/* Username field */}
              <Input
                name="username"
                label="Enter username"
                type="text"
                errors={this.state.errors.username}
                onChange={this.handleInput}
                required
              />

              {/* Email field */}
              <Input
                name="email"
                label="Enter email"
                type="email"
                errors={this.state.errors.email}
                onChange={this.handleInput}
                required
              />

              {/* Password field */}
              <Input
                name="password"
                label="Enter password"
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
                label="Enter hometown"
                type="text"
                errors={this.state.errors.hometown}
                onChange={this.handleInput}
              />

              {/* Current city field */}
              <Input
                name="current_city"
                label="Enter current city"
                type="text"
                errors={this.state.errors.current_city}
                onChange={this.handleInput}
              />

              {/* School field */}
              <Input
                name="school"
                label="Enter school"
                type="text"
                errors={this.state.errors.school}
                onChange={this.handleInput}
              />

              {/* College field */}
              <Input
                name="college"
                label="Enter college"
                type="text"
                errors={this.state.errors.college}
                onChange={this.handleInput}
              />

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

  register = async event => {
    event.preventDefault();

    if (!this.state.formInvalid) {
      // send to api service and get response
      ApiService.register(this.state.form_data).then(res => {
        let data = res.data;
        if (data.status) {
          if (data.status === "success") {
            // redirect to login
            // TODO show success
            this.props.history.push("/login");
          } else {
            // show errors
            this.setState({ errors: data.errors });
          }
        } else {
          // TODO something went wrong
        }
      });
    }
  };
}

export default RegisterPage;
