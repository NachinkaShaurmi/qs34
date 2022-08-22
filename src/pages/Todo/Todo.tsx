import { useMutation, useLazyQuery } from "@apollo/client";
import Checkbox from "components/Checkbox/Checkbox";
import DefaultLayout from "layout/DefaultLayout";
import { UPDATE_TODO, CREATE_TODO } from "mutation/todo";
import { GET_ONE_TODO } from "query/todo";
import React, { FormEventHandler, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ITodo } from "types";
import URLS from "urls";

export enum TodoType {
  Create = "create",
  Update = "update",
}

interface ITodoProps {
  type: TodoType;
}

const Todo: React.FC<ITodoProps> = ({ type }) => {
  const isUpdate = type === TodoType.Update;

  const { id: todoId } = useParams();
  const navigate = useNavigate();

  const [getTodo, { data, loading }] = useLazyQuery<{ todo: ITodo }>(
    GET_ONE_TODO,
    {
      variables: {
        id: todoId,
      },
    }
  );

  const [createTodo, { loading: createTodoLoading, error: createError }] =
    useMutation(CREATE_TODO);
  const [updateTodo, { loading: updateTodoLoading, error: updateError }] =
    useMutation(UPDATE_TODO);

  const [title, setTitle] = useState("");
  const [checked, setChecked] = useState(false);
  const [todo, setTodo] = useState<ITodo>();

  useEffect(() => {
    if (todoId && isUpdate) getTodo();
  }, [todoId, getTodo, isUpdate]);

  useEffect(() => {
    if (!loading && data?.todo) {
      const { completed, title } = data.todo;
      setTodo(data.todo);
      setTitle(title);
      setChecked(completed);
    }
  }, [data, loading]);

  useEffect(() => {
    if (createError || updateError) navigate(URLS.Error);
  }, [navigate, createError, updateError]);

  const handleChecked = () => {
    setChecked(!checked);
  };

  const inputData = {
    title,
    completed: checked,
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (isUpdate) {
      updateTodo({
        variables: {
          id: todo?.id,
          input: inputData,
        },
      });
    } else {
      createTodo({
        variables: {
          input: inputData,
        },
      });
    }
  };

  const isChanged = todo?.completed !== checked || todo?.title !== title;
  const disableCondition =
    !isChanged || loading || createTodoLoading || updateTodoLoading;
  return (
    <DefaultLayout>
      {loading && <h2>Loading...</h2>}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <div>Todo {todoId}</div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Checkbox
            label="completed"
            value={!!checked}
            onChange={handleChecked}
          />
          <input type="submit" value="Save" disabled={disableCondition} />
        </form>
      )}
    </DefaultLayout>
  );
};

export default React.memo(Todo);
