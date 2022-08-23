import { useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { GET_ALL_TODO } from "query/todo";
import { ITodo, ITodosPage } from "types";
import DefaultLayout from "layout/DefaultLayout";
import { useNavigate } from "react-router-dom";
import URLS from "urls";
import List from "components/List/List";
import Filter from "components/Filter/Filter";

const TodosList = () => {
  const navigate = useNavigate();

  const { data, loading, refetch, error } = useQuery<ITodosPage>(
    GET_ALL_TODO,
    {}
  );

  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    if (!loading && data?.todos.data.length) {
      setTodos(data.todos.data);
    }
  }, [data, loading]);

  useEffect(() => {
    if (error) navigate(URLS.Error);
  }, [navigate, error]);

  const filterCallBack = useCallback(
    (str: string) => {
      refetch({
        options: {
          search: { q: str },
        },
      });
    },
    [refetch]
  );

  return (
    <DefaultLayout>
      <Filter cbFunction={filterCallBack} />
      {loading && <h2>Loading...</h2>}
      {!loading && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <List todos={todos} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default TodosList;
