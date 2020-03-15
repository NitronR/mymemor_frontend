import "./RegisterPage.css";

import { toastError, toastSuccess } from "../../utils/Toast";

import ApiService from "../../service/ApiService";
import Card from "react-bootstrap/Card";
import { Form } from "react-bootstrap";
import Input from "../Form/Input";
import React from "react";
import RedirectIf from "../RedirectIf";
import checkUsername from "../../utils/Validation";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";
import { setLoading } from "../../actions";

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
        profile_pic_url: "",
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
        <RedirectIf condition={this.props.user.authenticated} to="/memoline" />

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

              {/* Profile picture field field */}
              <Input
                name="profile_pic_url"
                label="Profile picture URL"
                type="text"
                errors={this.state.errors.profile_pic_url}
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

      this.props.setLoading(true);

      try {
        let response = await ApiService.register(this.state.form_data);

        if (response.status !== 200) throw new Error(response.statusText);

        response = response.data;

        if (response.status === "success") {
          // show success
          toastSuccess("Registered successfully.");
          // redirect to login
          this.props.history.push("/login");
        } else if (response.status === "error") {
          // show errors
          this.setState({ errors: response.errors });
        } else {
          toastError("Something went wrong");
        }
      } catch (e) {
        // handle promise reject
        toastError(e.toString());
      } finally {
        this.props.setLoading(false);
      }
    }
  };
}

const mapStateToProps = state => {
  let user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps, { setLoading })(RegisterPage);
