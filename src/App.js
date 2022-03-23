import React, { useState } from "react";
import axios from "axios";

import { useCallback, useEffect, useReducer } from "react";

import List from "./components/List";
import storiesReducer from "./components/storiesReducer";
import useSemiPersistentState from "./components/useSemiPersistentState";
import SearchForm from "./components/SearchForm";
import LastSearches from "./components/LastSearches";

const API_BASE = "https://hn.algolia.com/api/v1";
const API_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";

const getUrl = (searchTerm, page) =>
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

const extractSearchTerm = (url) =>
  url
    .substring(url.lastIndexOf("?") + 1, url.lastIndexOf("&"))
    .replace(PARAM_SEARCH, "");

const getLastSearches = (urls) =>
  urls
    .reduce((result, url, index) => {
      const searchTerm = extractSearchTerm(url);
      if (index === 0) {
        return result.concat(searchTerm);
      }
      const previousSearchTerm = result[result.length - 1];
      if (searchTerm === previousSearchTerm) {
        return result;
      } else {
        return result.concat(searchTerm);
      }
    }, [])
    .slice(-6)
    .slice(0, -1)
    .map(extractSearchTerm);

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    "search",
    "React"
  );
  const [urls, setUrls] = useState([getUrl(searchTerm, 0)]);

  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    page: 0,
    isLoading: false,
    isError: false,
  });

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });
    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl);
      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: {
          list: result.data.hits,
          page: result.data.page,
        },
      });
    } catch {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [urls]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    handleSearch(searchTerm, 0);
    e.preventDefault();
  };

  const handleLastSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    handleSearch(searchTerm, 0);
  };

  const handleMore = () => {
    const lastUrl = urls[urls.length - 1];
    const searchTerm = extractSearchTerm(lastUrl);
    handleSearch(searchTerm, stories.page + 1);
  };

  const handleSearch = (searchTerm, page) => {
    const url = getUrl(searchTerm, page);
    setUrls(urls.concat(url));
  };

  const lastSearches = getLastSearches(urls);

  return (
    <div>
      <h1>My Hacker Stories ..</h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      <LastSearches
        lastSearches={lastSearches}
        onLastSearch={handleLastSearch}
      />

      <hr />

      {stories.isError && <h2>Something went wrong ....</h2>}

      <List list={stories.data} onRemoveItem={handleRemoveStory} />

      {stories.isLoading ? (
        <h2>Loading....</h2>
      ) : (
        <button type="button" onClick={handleMore}>
          More
        </button>
      )}
    </div>
  );
};
// const StyledContainer = styled.div`
//   height: 100vw;
//   padding: 20px;
//   background: #83a4d4;
//   background: linear-gradient(to left, #b6fbff, #83a4d4);
//   color: #171212;
// `;
// const StyledHeadlinePrimary = styled.h1`
//   font-size: 48px;
//   font-weight: 300;
//   letter-spacing: 2px;
// `;

// export const StyledItem = styled.li`
//   display: flex;
//   align-items: center;
//   padding-bottom: 5px;
// `;
// export const StyledColumn = styled.span`
//   padding: 0 5px;
//   white-space: nowrap;
//   overflow: hidden;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   a {
//     color: inherit;
//   }
//   width: ${(props) => props.width};
// `;

// export const StyledButton = styled.button`
//   background: transparent;
//   border: 1px solid #171212;
//   padding: 5px;
//   cursor: pointer;
//   transition: all 0.1s ease-in;
//   &:hover {
//     background: #171212;
//     color: #ffffff;
//   }
// `;
// export const StyledButtonSmall = styled(StyledButton)`
//   padding: 5px;
// `;
// export const StyledButtonLarge = styled(StyledButton)`
//   padding: 10px;
// `;
// export const StyledSearchForm = styled.form`
//   padding: 10px 0 20px 0;
//   display: flex;
//   align-items: baseline;
// `;

// export const StyledLabel = styled.label`
//   border-top: 1px solid #171212;
//   border-left: 1px solid #171212;
//   padding-left: 5px;
//   font-size: 24px;
// `;
// export const StyledInput = styled.input`
//   border: none;
//   border-bottom: 1px solid #171212;
//   background-color: transparent;
//   font-size: 24px;
// `;
export default App;

// export { Item, List, SearchForm, storiesReducer, InputWithLabel };
