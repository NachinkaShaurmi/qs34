import React from "react";
import { Link } from "react-router-dom";
import { ITodo } from "types";
import URLS from "urls";
import "./List.scss"

interface IList {
  todos: ITodo[];
}

const List: React.FC<IList> = ({ todos }) => {
  if (todos.length === 0) return <span>Empty</span>;
  return (
    <ul>
      {!!todos &&
        todos.map((todo) => (
          <li className="todo" key={todo.id}>
            <Link to={`${URLS.Todo}/${todo.id}`} className="link-wrapper">
              {todo.id}. {todo.title}{" "}
              {todo.completed ? <span style={{color: 'green'}}>DONE</span> : <span style={{color: 'blue'}}>IN PROGRESS</span>}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default List;
