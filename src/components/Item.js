import { StyledItem, span, StyledButtonSmall } from "../App";
import { ImCheckmark2 } from "react-icons/im";

const Item = (props) => (
  <li style={{ display: "flex" }}>
    <span style={{ width: "40%" }}>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span style={{ width: "30%" }}>{props.item.author}</span>
    <span style={{ width: "10%" }}>{props.item.num_comments}</span>
    <span style={{ width: "10%" }}>{props.item.points} </span>
    <span style={{ width: "10%" }}>
      <button
        type="button"
        onClick={() => props.onRemoveItem(props.item)}
      >
        Dismiss
      </button>
    </span>
  </li>
);

export default Item;
