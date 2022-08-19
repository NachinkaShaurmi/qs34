import DefaultLayout from "layout/DefaultLayout";
import React from "react";
import { useParams } from "react-router-dom";

const Todo = () => {
  const { id: todoId } = useParams();

  return (
    <DefaultLayout>
      <div>Todo {todoId}</div>
    </DefaultLayout>
  );
};

export default Todo;
