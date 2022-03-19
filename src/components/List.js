import { memo } from "react";
import Item from "./Item";

const List = memo(
  (props) =>
    console.log("B:List") || (
      <ul>
        {props.list.map((item) => (
          <Item
            key={item.objectID}
            item={item}
            onRemoveItem={props.onRemoveItem}
          />
        ))}
      </ul>
    )
);

export default List;
