import "./SearchPage.css";

import ApiService from "../../service/ApiService";
import { Link } from "react-router-dom";
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
      pageNumber: 1
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

        <div id="search-container" style={{ marginTop: "1rem" }}>
          <h3>Search results for</h3>
          <h4>{this.state.query}</h4>

          {/* Search results */}
          <div id="search-results">
            {/* TODO show no search results */}
            {this.state.searchResults.map(searchResult => {
              if (searchResult.username === this.props.user.username) {
                return null;
              }
              return (
                <Link
                  to={"/profile/" + searchResult.username}
                  style={{ padding: "0.1rem", textDecoration: "none" }}
                >
                  <PersonCard
                    person={searchResult}
                  />
                </Link>
              );
            })}
          </div>
          {/* TODO add pagination */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let user = getUserState(state);
  return { user };
};

export default connect(mapStateToProps, { setLoading })(SearchPage);
