import { useEffect, useRef } from "react";
import { StyledLabel, StyledInput } from "../App";

const InputWithLabel = (props) => {
  const inputRef = useRef();

  useEffect(() => {
    if (props.isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.isFocused]);

  return (
    <>
      <StyledLabel htmlFor={props.id}>{props.children}</StyledLabel>
      &nbsp;
      <StyledInput
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
