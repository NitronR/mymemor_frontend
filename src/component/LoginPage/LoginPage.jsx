import React from "react";
import Card from "react-bootstrap/Card";
import "./LoginPage.css";
import { Form, Alert } from "react-bootstrap";
import Input from "../Form/Input";
import ApiService from "../../service/ApiService";
import { Link } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form_data: {
        username_email: "",
        password: ""
      },
      errors: {}
    };

    this.handleInput = this.handleInput.bind(this);
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <div className="boundary-center">
        <Card id="login-card">
          <Card.Title>
            {/* Login heading */}
            <h3>Login</h3>
          </Card.Title>
          <Card.Body>
            {/* Login form */}
            <Form id="login-form" onSubmit={this.login} className="text-left">
              {/* Non field errors */}
              <Alert variant={"danger"} show={"non_field" in this.state.errors}>
                {this.state.errors.non_field &&
                  this.state.errors.non_field.map((error, idx) => (
                    <div key={idx}>{error}</div>
                  ))}
              </Alert>

              {/* Username/Email */}
              <Input
                name="username_email"
                type="text"
                label="Username/Email"
                onChange={this.handleInput}
                required
              />

              {/* Password */}
              <Input
                name="password"
                type="password"
                label="Password"
                required
              />

              {/* Login button */}
              <Form.Control
                type="submit"
                className="btn-primary"
                value="Login"
              />
            </Form>

            <br />

            {/* Register link */}
            <Link to="/register">No Account? Register here.</Link>
          </Card.Body>
        </Card>
      </div>
    );
  }

  handleInput(event) {
    let name = event.target.name;
    let value = event.target.value;

    this.setState(prevState => {
      return {
        form_data: {
          ...prevState.form_data,
          [name]: value
        }
      };
    });
  }

  login(event) {
    event.preventDefault();

    // clear errors
    this.setState({ errors: {} });

    // verify credentials
    // TODO handle promise reject
    // TODO show loading

    ApiService.login(this.state.form_data).then(response => {
      response = response.data;

      if (response.status === "success") {
        this.props.history.push("/memoline");
      } else if (response.status === "error") {
        this.setState({ errors: response.errors });
      } else {
        // TODO something went wrong
      }
    });
  }
}

export default LoginPage;
