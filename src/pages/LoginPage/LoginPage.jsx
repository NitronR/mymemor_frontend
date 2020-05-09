import "./LoginPage.css";

import { Alert, Form } from "react-bootstrap";
import { loginUser, setLoading } from "../../actions";

import ApiService from "../../service/ApiService";
import Card from "react-bootstrap/Card";
import Input from "../../component/Form/Input/Input";
import { Link } from "react-router-dom";
import React from "react";
import RedirectIf from "../../component/RedirectIf/RedirectIf";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";

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
        {/* Redirect to memoline if logged in */}
        <RedirectIf condition={this.props.user.authenticated} to="/memoline" />

        <Card className="main-card">
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
                onChange={this.handleInput}
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

  login = async event => {
    event.preventDefault();

    // clear errors
    this.setState({ errors: {} });

    // verify credentials

    // show loading
    this.props.setLoading(true);

    try {
      let response = await ApiService.login(this.state.form_data);

      // throw if not ok
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      response = response.data;

      if (response.status === "success") {
        // login user
        // TODO improve
        let username = response.username;

        this.props.loginUser({ username: username, authenticated: true });

        // redirect to memoline
        this.props.history.push("/memoline");
      } else if (response.status === "error") {
        // show error in form
        this.setState({ errors: response.errors });
      } else {
        // TODO something went wrong
      }
    } catch (e) {
      // TODO handle promise reject
    } finally {
      // stop loading
      this.props.setLoading(false);
    }
  };
}

const mapStateToProps = state => {
  const user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps, { loginUser, setLoading })(LoginPage);
