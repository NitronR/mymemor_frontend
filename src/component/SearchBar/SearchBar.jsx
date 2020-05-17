import "./SearchBar.css";

import { Button, Form } from "react-bootstrap";

import Input from "../Form/Input/Input";
import PersonCard from "../../pages/ProfilePage/PersonCard/PersonCard";
import PropTypes from "prop-types";
import React from "react";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasFocus: false,
    };
  }
  render() {
    return (
      <Form
        inline
        // on enter, search
        onSubmit={(event) => {
          event.preventDefault();
          this.props.onSearch();
        }}
        className="search-bar-container"
        onFocus={() => this.setState({ hasFocus: true })}
        // TODO: improve
        // losing focus is delayed to allow click on suggestion
        // otherwise focus is lost before click is registered and suggestions are hidden
        onBlur={() => setTimeout(() => this.setState({ hasFocus: false }), 200)}
      >
        {/* search input */}
        <Input
          name="search"
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          onChange={(event) => this.props.onChange(event.target.value)}
        />

        {/* Show suggestions dropdown if suggestions available and search bar has focus */}
        {this.state.hasFocus && this.props.suggestions.length !== 0 && (
          <div className="search-suggestions-dropdown">
            {/* Render suggestions */}
            {this.props.suggestions.map((suggestion) => (
              <PersonCard
                person={suggestion}
                size="tiny"
                onClick={() => this.props.onSuggestionClick(suggestion)}
                clickable
              />
            ))}

            {/* See all button */}
            <Button onClick={this.props.onSearch} style={{ width: "100%" }}>
              See All
            </Button>
          </div>
        )}
      </Form>
    );
  }
}

SearchBar.propTypes = {
  suggestions: PropTypes.array,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
  onSuggestionClick: PropTypes.func,
};

SearchBar.defaultProps = {
  suggestions: [],
};

export default SearchBar;
