import React from "react";
import InputWithLabel from "./InputWithLabel";

const SearchForm = (props) => {
  return (
    <form onSubmit={props.onSearchSubmit}>
      <InputWithLabel
        id="search"
        value={props.searchTerm}
        isFocused
        onInputChange={props.onSearchInput}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <button type="submit" disabled={!props.searchTerm}>
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
