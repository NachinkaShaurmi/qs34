import React from "react";

interface IFilter {
  cbFunction: (str: string) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const Filter: React.FC<IFilter> = ({ cbFunction, title, setTitle }) => {

  const filterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    cbFunction(e.target.value); // TODO add debounce
  };

  return (
    <input type="text" name="title" value={title} onChange={filterHandler} />
  );
};

export default React.memo(Filter);
