import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import { logoutUser, setLoading } from "../../actions";

import ApiService from "../../service/ApiService";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";
import { toastInfo } from "../../utils/Toast";

// idle time after which search suggestions are fetched
const SUGGESTIONS_DEBOUNCE = 2000;

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      searchSuggestions: [],
    };

    this.fetchSuggestions = this.fetchSuggestions.bind(this);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
    this.clearSuggestions = this.clearSuggestions.bind(this);
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
                {/* Search Bar*/}
                <SearchBar
                  onChange={this.handleSearchChange}
                  onSearch={this.handleSearch}
                  onBlur={this.clearSuggestions}
                  onSuggestionClick={this.handleSuggestionClick}
                  suggestions={this.state.searchSuggestions}
                />

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
  fetchSuggestions = async function () {
    try {
      let response = await ApiService.getSearchSuggestions(
        this.state.searchQuery
      );

      // throw if not ok
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      response = response.data;

      if (response.status === "success") {
        // filter current user from suggestions
        response.searchResults = response.searchResults.filter(
          (searchResult) => searchResult.username !== this.props.user.username
        );

        this.setState({ searchSuggestions: response.searchResults });
      } else {
        // TODO show error
      }
    } catch (e) {
      // TODO handle promise reject
    }
  };
  handleSearchChange(searchQuery) {
    searchQuery = searchQuery.trim();

    // update search query in state and clear suggestions
    this.setState({ searchQuery });

    this.clearSuggestions();

    if (searchQuery.trim() !== "") {
      // set debounce only if query not empty
      this.suggestionsDebounce = setTimeout(
        this.fetchSuggestions,
        SUGGESTIONS_DEBOUNCE
      );
    }
  }
  handleSearch() {
    // if search bar empty, do not search
    if (this.state.searchQuery === "") {
      toastInfo("Please enter a search query.");
      return;
    }

    // clear suggestions
    this.clearSuggestions();

    // show search page
    this.props.history.push("/search/" + this.state.searchQuery);
  }
  handleSuggestionClick(suggestion) {
    // show profile of suggested person
    this.props.history.push("/profile/" + suggestion.username);
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
  clearSuggestions() {
    // update search query in state and clear suggestions
    this.setState({ searchSuggestions: [] });

    // clear suggestions debounce
    if (this.suggestionsDebounce) {
      clearTimeout(this.suggestionsDebounce);
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
