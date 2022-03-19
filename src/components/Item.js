import { StyledItem, StyledColumn, StyledButtonSmall } from "../App";
import { ImCheckmark2 } from "react-icons/im";

const Item = (props) => (
  <StyledItem>
    <StyledColumn width="40%">
      <a href={props.item.url}>{props.item.title}</a>
    </StyledColumn>
    <StyledColumn width="30%">{props.item.author}</StyledColumn>
    <StyledColumn width="10%">{props.item.num_comments}</StyledColumn>
    <StyledColumn width="10%">{props.item.points} </StyledColumn>
    <StyledColumn width="10%">
      <StyledButtonSmall
        type="button"
        onClick={() => props.onRemoveItem(props.item)}
      >
        <ImCheckmark2 height="18px" width="18px" />
      </StyledButtonSmall>
    </StyledColumn>
  </StyledItem>
);

export default Item;
