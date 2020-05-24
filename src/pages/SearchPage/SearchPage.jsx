import "./SearchPage.css";

import ApiService from "../../service/ApiService";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MessageCard } from "../../component/MessageCard/MessageCard";
import PersonCard from "../ProfilePage/PersonCard/PersonCard";
import React from "react";
import RedirectIf from "../../component/RedirectIf";
import { connect } from "react-redux";
import { getUserState } from "../../selectors";
import { setLoading } from "../../actions";
import { toastError } from "../../utils/Toast";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      query: this.props.match.params.query,
      pageNumber: 1,
    };

    this.fetchSearchResults = this.fetchSearchResults.bind(this);
  }
  componentDidMount() {
    this.fetchSearchResults();
  }
  async fetchSearchResults() {
    // start loading
    this.props.setLoading(true);

    // fetch results
    try {
      let response = await ApiService.search(
        this.state.query,
        this.state.pageNumber
      );

      // if status not ok then throw
      if (response.status !== 200) throw new Error(response.statusText);

      response = response.data;

      if (response.status === "success") {
        // remove current user from search results if included
        response.searchResults = response.searchResults.filter(
          (searchResult) => {
            return searchResult.username !== this.props.user.username;
          }
        );
        // show search results
        this.setState({ searchResults: response.searchResults });
      } else if (response.status === "error") {
        toastError(response.error);
      } else {
        toastError("Something went wrong");
      }
    } catch (error) {
      // handle promise reject
      toastError(error.toString());
    } finally {
      // stop loading
      this.props.setLoading(false);
    }
  }
  render() {
    return (
      <div id="search-boundary">
        {/* Redirect to login if not logged in */}
        <RedirectIf condition={!this.props.user.authenticated} to="/login" />

        <div className="main-section" style={{ margin: "1rem" }}>
          {/* Search query text */}
          <Card>
            <Card.Body>
              <h4>Search results for:</h4>
              <h5>{this.state.query}</h5>
            </Card.Body>
          </Card>

          {/* If no search results show message */}
          {this.state.searchResults.length === 0 ? (
            <MessageCard spaced>
              <h5>No matches found.</h5>
            </MessageCard>
          ) : (
            <div id="search-results">
              {/* Search results */}
              {this.state.searchResults.map((searchResult) => (
                <Link
                  to={"/profile/" + searchResult.username}
                  style={{ textDecoration: "none" }}
                >
                  <PersonCard
                    person={searchResult}
                    style={{ marginTop: "0.7rem" }}
                  />
                </Link>
              ))}
            </div>
          )}
          {/* TODO add pagination */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps, { setLoading })(SearchPage);
