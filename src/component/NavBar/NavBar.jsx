import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import { logoutUser, setLoading } from "../../actions";

import ApiService from "../../service/ApiService";
import Input from "../Form/Input/Input";
import React from "react";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          {/* brand */}
          <Navbar.Brand as={NavLink} to="/">
            MyMemor
          </Navbar.Brand>

          {/* toggle button */}
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            {/* nav items */}
            {!this.props.user.authenticated && (
              <Nav className="ml-auto">
                {/* login nav */}
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>

                {/* register nav */}
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </Nav>
            )}
            {this.props.user.authenticated && (
              <Nav className="ml-auto">
                {/* Search input*/}
                <Form inline onSubmit={this.handleSearch}>
                  <Input
                    name="search"
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    onChange={this.handleInput}
                  />
                </Form>

                {/* memoline nav */}
                <Nav.Link as={NavLink} to="/memoline">
                  Memoline
                </Nav.Link>

                {/* profile nav */}
                <Nav.Link
                  as={NavLink}
                  to={"/profile/" + this.props.user.username}
                >
                  Profile
                </Nav.Link>

                {/* MyPeople nav */}
                <Nav.Link as={NavLink} to="/my-people">
                  MyPeople
                </Nav.Link>

                {/* MyPeople nav */}
                <Nav.Link as={NavLink} to="/bond-requests">
                  Bond Requests
                </Nav.Link>

                {/* Username nav dropdown -> login */}
                <NavDropdown
                  title={"@" + this.props.user.username}
                  id="username-dropdown"
                >
                  <NavDropdown.Item onClick={this.handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  handleInput(event) {
    let name = event.target.name,
      value = event.target.value;

    this.setState({ [name]: value });
  }
  handleSearch(event) {
    event.preventDefault();
    this.props.history.push("/search/" + this.state.search);
  }
  async handleLogout() {
    this.props.setLoading(true);

    try {
      let response = await ApiService.logout();

      // throw if not ok
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      response = response.data;

      if (response.status === "success") {
        this.props.logoutUser();
        this.props.history.push("/login");
      } else {
        // TODO show error
      }
    } catch (e) {
      // TODO handle promise reject
    } finally {
      // stop loading
      this.props.setLoading(false);
    }
  }
}

const mapStateToProps = (state) => {
  let user = getUserState(state);
  return { user };
};

export default withRouter(
  connect(mapStateToProps, { logoutUser, setLoading })(NavBar)
);
