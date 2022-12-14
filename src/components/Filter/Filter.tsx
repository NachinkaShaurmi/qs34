import React, { useState } from "react";

interface IFilter {
  cbFunction: (str: string) => void;
}

const Filter: React.FC<IFilter> = ({ cbFunction }) => {
  const [title, setTitle] = useState("");

  const filterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    cbFunction(e.target.value); // TODO add debounce
  };

  return (
    <input
      autoFocus
      type="text"
      name="title"
      value={title}
      onChange={filterHandler}
    />
  );
};

export default React.memo(Filter);
