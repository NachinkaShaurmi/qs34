import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_ALL_TODO } from "query/todo";
import { ITodo, ITodosPage } from "types";
import DefaultLayout from "layout/DefaultLayout";
import { useNavigate } from "react-router-dom";
import URLS from "urls";
import List from "components/List/List";

const TodosList = () => {
  const navigate = useNavigate();

  const { data, loading, refetch, error } = useQuery<ITodosPage>(GET_ALL_TODO);

  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    if (!loading && (data?.todos.data.length)) {
      setTodos(data.todos.data);
    }
  }, [data, loading]);

  useEffect(() => {
    if (error) navigate(URLS.Error);
  }, [navigate, error]);

  const getAll = () => {
    refetch();
  };

  return (
    <DefaultLayout>
      {loading && <h2>Loading...</h2>}
      {!loading && (
        <>
          <div className="btns">
            <button disabled={loading} onClick={() => getAll()}>Get all</button>
          </div>
          <List todos={todos} />
        </>
      )}
    </DefaultLayout>
  );
};

export default TodosList;
