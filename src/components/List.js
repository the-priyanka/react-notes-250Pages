import { sortBy } from "lodash";
import { useState } from "react";
import Item from "./Item";

const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, "title"),
  AUTHOR: (list) => sortBy(list, "author"),
  COMMENT: (list) => sortBy(list, "num_comments").reverse(),
  POINT: (list) => sortBy(list, "points").reverse(),
};

const List = (props) => {
  const [sort, setSort] = useState("NONE");

  const handleSort = (sortKey) => {
    setSort(sortKey);
  };

  const sortFunction = SORTS[sort];
  const sortedList = sortFunction(props.list);

  return (
    <ul>
      <li style={{ display: "flex" }}>
        <span style={{ width: "40%" }}>
          <button onClick={() => handleSort("TITLE")}>Title</button>
        </span>
        <span style={{ width: "30%" }}>
          <button onClick={() => handleSort("AUTHOR")}>Author</button>
        </span>
        <span style={{ width: "10%" }}>
          <button onClick={() => handleSort("COMMENT")}>
            Comments
          </button>
        </span>
        <span style={{ width: "10%" }}>
          <button onClick={() => handleSort("POINT")}>Points</button>
        </span>
        <span style={{ width: "10%" }}>Actions</span>
      </li>

      {sortedList.map((item) => (
        <Item
          key={item.objectID}
          item={item}
          onRemoveItem={props.onRemoveItem}
        />
      ))}
    </ul>
  );
};

export default List;
