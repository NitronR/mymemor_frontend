import React from "react";
import Card from "react-bootstrap/Card";
import "./LoginPage.css";
import { Form, Alert } from "react-bootstrap";
import Input from "../Form/Input";
import ApiService from "../../service/ApiService";
import { Link, Redirect } from "react-router-dom";
import { getUserState } from "../../selectors";
import { connect } from "react-redux";
import { loginUser, setLoading } from "../../actions";

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
        {this.props.user.authenticated && <Redirect to="/memoline" />}

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
