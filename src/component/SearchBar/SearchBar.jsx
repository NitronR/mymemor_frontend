import "./SearchBar.css";

import { Button, Form } from "react-bootstrap";

import Input from "../Form/Input/Input";
import PersonCard from "../../pages/ProfilePage/PersonCard/PersonCard";
import PropTypes from "prop-types";
import React from "react";

function SearchBar(props) {
  return (
    <Form
      inline
      // on enter, search
      onSubmit={(event) => {
        event.preventDefault();
        props.onSearch();
      }}
      className="search-bar-container"
      // TODO: improve
      // losing focus is delayed to allow click on suggestion
      // otherwise focus is lost before click is registered and suggestions are hidden
      onBlur={() => setTimeout(props.onBlur, 200)}
    >
      {/* search input */}
      <Input
        name="search"
        type="text"
        placeholder="Search people"
        className="mr-sm-2"
        onChange={(event) => props.onChange(event.target.value)}
      />

      {/* Show suggestions dropdown if suggestions available and search bar has focus */}
      {props.suggestions.length !== 0 && (
        <div className="search-suggestions-dropdown">
          {/* Render suggestions */}
          {props.suggestions.map((suggestion) => (
            <PersonCard
              person={suggestion}
              size="tiny"
              onClick={() => props.onSuggestionClick(suggestion)}
              clickable
            />
          ))}

          {/* See all button */}
          <Button onClick={props.onSearch} style={{ width: "100%" }}>
            See All
          </Button>
        </div>
      )}
    </Form>
  );
}

SearchBar.propTypes = {
  suggestions: PropTypes.array,
  onSearch: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onSuggestionClick: PropTypes.func,
};

SearchBar.defaultProps = {
  suggestions: [],
};

export default SearchBar;
