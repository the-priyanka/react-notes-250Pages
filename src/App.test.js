// import { render, screen } from "@testing-library/react";
// import App from "./App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";

import App, {
  storiesReducer,
  Item,
  List,
  SearchFrom,
  InputWithLabel,
  SearchForm,
} from "./App";

describe("something truthy and falsy", () => {
  test("true to be true", () => {
    expect(true).toBeTruthy();
  });

  test("false to be false", () => {
    expect(false).toBeFalsy();
  });
});

const storyOne = {
  title: "React",
  url: "https://reactjs.org/",
  author: "Jordan Walke",
  num_comments: 3,
  points: 4,
  objectID: 0,
};

const storyTwo = {
  title: "Redux",
  url: "https://redux.js.org/",
  author: "Dan Abramov, Andrew Clark",
  num_comments: 2,
  points: 5,
  objectID: 1,
};

const stories = [storyOne, storyTwo];

describe("storiesReducer", () => {
  test("removes a story from all stories", () => {
    const action = { type: "REMOVE_STORY", payload: storyOne };
    const state = { data: stories, isLoading: false, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });
});

describe("Item", () => {
  test("renders all properties", () => {
    render(<Item item={storyOne} />);
    expect(screen.getByText("Jordan Walke")).toBeInTheDocument();
    expect(screen.getByText("React")).toHaveAttribute(
      "href",
      "https://reactjs.org/"
    );
  });
  test("renders a clickable dismiss button", () => {
    render(<Item item={storyOne} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("clicking the dismiss button calls the callback handler", () => {
    const handleRemoveItem = jest.fn();
    render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
  });
});

describe("SearchForm", () => {
  const searchFormProps = {
    searchTerm: "React",
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn(),
  };
  test("renders the input field with its value", () => {
    render(<SearchForm {...searchFormProps} />);
    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
  });
  test("calls onSearchInput on input field change", () => {
    render(<SearchForm {...searchFormProps} />);
    fireEvent.change(screen.getByDisplayValue("React"), {
      target: { value: "Redux" },
    });
    expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
  });
  test("calls onSearchSubmit on button submit click", () => {
    render(<SearchForm {...searchFormProps} />);
    fireEvent.submit(screen.getByRole("button"));
    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
  });
});

<body>
  <div>
    <li>
      <span>
        <a href="https://reactjs.org/">React</a>
      </span>
      <span>Jordan Walke</span>
      <span>3</span>
      <span>4</span>
      <span>
        <button type="button">Dismiss</button>
      </span>
    </li>
  </div>
</body>;
