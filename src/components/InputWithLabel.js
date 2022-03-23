import { useEffect, useRef } from "react";

const InputWithLabel = (props) => {
  const inputRef = useRef();

  useEffect(() => {
    if (props.isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.isFocused]);

  return (
    <>
      <label htmlFor={props.id}>{props.children}</label>
      &nbsp;
      <input
        id={props.id}
        ref={props.inputRef}
        type={props.type}
        value={props.value}
        onChange={props.onInputChange}
      />
    </>
  );
};

export default InputWithLabel;
