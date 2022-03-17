import Item from "./Item";

const List = ({ list, onRemoveItem }) => (
  <ol>
    {list.map((item) => (
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </ol>
);

export default List;
