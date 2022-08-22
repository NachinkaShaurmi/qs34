import React from "react";
import { Link } from "react-router-dom";
import { ITodo } from "types";
import URLS from "urls";

interface IList {
  todos: ITodo[];
}

const List: React.FC<IList> = ({todos}) => {
  if (todos.length === 0) return <span>Empty</span>;
  return (
    <ul>
      {!!todos &&
        todos.map((todo) => (
          <li className="todo" key={todo.id}>
            <Link to={`${URLS.Todo}/${todo.id}`}>
              {todo.id}. {todo.title} {todo.completed ? "DONE" : "IN PROGRESS"}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default List;
