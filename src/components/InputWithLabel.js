import { useEffect, useRef } from "react";
import styles from "../App.module.css";

const InputWithLabel = (props) => {
  const inputRef = useRef();

  useEffect(() => {
    if (props.isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.isFocused]);

  return (
    <>
      <label htmlFor={props.id} className={styles.label}>
        {props.children}
      </label>
      &nbsp;
      <input
        className={styles.input}
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
