import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from "react";

const Search = ({ onSubmit }, ref) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    submitted: () => {
      setInputValue("");
      inputRef.current.focus();
    }
  }));

  const handleFocus = event => {
    event.target.select();
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    if (inputValue && onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className="search">
      <input
        required
        onFocus={handleFocus}
        type="text"
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value);
        }}
        ref={inputRef}
        placeholder="Say sth funny!"
      />
      <button type="submit">Help me out Chewie!</button>
    </form>
  );
};

export default forwardRef(Search);
