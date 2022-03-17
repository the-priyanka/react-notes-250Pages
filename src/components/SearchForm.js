import React from "react";
import { StyledSearchForm, StyledButtonLarge } from "../App";
import InputWithLabel from "./InputWithLabel";

const SearchForm = (props) => {
  return (
    <StyledSearchForm onSubmit={props.onSearchSubmit}>
      <InputWithLabel
        id="search"
        value={props.searchTerm}
        isFocused
        onInputChange={props.onSearchInput}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <StyledButtonLarge type="submit" disabled={!props.searchTerm}>
        Submit
      </StyledButtonLarge>
    </StyledSearchForm>
  );
};

export default SearchForm;
