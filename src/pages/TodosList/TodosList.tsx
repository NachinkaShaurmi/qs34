import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ALL_TODO } from "query/todo";
import { ITodo, ITodosPage } from "types";
import DefaultLayout from "layout/DefaultLayout";

const TodosList = () => {
  const { data, loading, refetch } = useQuery<ITodosPage>(GET_ALL_TODO);

  const [todos, setTodos] = useState<ITodo[]>();

  useEffect(() => {
    if (!loading) {
      setTodos(data?.todos.data);
    }
  }, [data, loading]);

  const getAll = () => {
    refetch();
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <DefaultLayout>
      <div className="btns">
        <button onClick={() => getAll()}>Get all</button>
      </div>
      <div>
        {!!todos &&
          todos.map((todo) => (
            <div className="user">
              {todo.id}. {todo.title} {todo.completed ? "DONE" : "IN PROGRESS"}
            </div>
          ))}
      </div>
    </DefaultLayout>
  );
};

export default TodosList;
