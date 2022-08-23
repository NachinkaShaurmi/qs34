import { useMutation, useLazyQuery } from "@apollo/client";
import Button from "components/Button/Button";
import Checkbox from "components/Checkbox/Checkbox";
import DefaultLayout from "layout/DefaultLayout";
import { UPDATE_TODO, CREATE_TODO, DELETE_TODO } from "mutation/todo";
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

  const [getTodo, { data, loading: getTodoLoading }] = useLazyQuery<{
    todo: ITodo;
  }>(GET_ONE_TODO, {
    variables: {
      id: todoId,
    },
  });

  const [createTodo, { loading: createTodoLoading, error: createError }] =
    useMutation(CREATE_TODO);

  const [updateTodo, { loading: updateTodoLoading, error: updateError }] =
    useMutation(UPDATE_TODO);

  const [deleteTodo, { loading: deleteTodoLoading, error: deleteError }] =
    useMutation(DELETE_TODO);

  const [title, setTitle] = useState("");
  const [checked, setChecked] = useState(false);
  const [todo, setTodo] = useState<ITodo>();

  useEffect(() => {
    if (todoId && isUpdate) getTodo();
  }, [todoId, getTodo, isUpdate]);

  useEffect(() => {
    if (!getTodoLoading && data?.todo) {
      const { completed, title } = data.todo;
      setTodo(data.todo);
      setTitle(title);
      setChecked(completed);
    }
  }, [data, getTodoLoading]);

  useEffect(() => {
    if (createError || updateError || deleteError) navigate(URLS.Error);
  }, [navigate, createError, updateError, deleteError]);

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
      // TODO add redirect on todo new page
    }
  };

  const handleDelete = () => {
    deleteTodo({
      variables: {
        id: todo?.id,
      },
    }).then((res) => {
      if (res.data.deleteTodo) navigate(URLS.Base, { replace: true });
    });
  };

  const isChanged = todo?.completed !== checked || todo?.title !== title;

  const loading =
    getTodoLoading ||
    createTodoLoading ||
    updateTodoLoading ||
    deleteTodoLoading;
  
  const disableCondition = !isChanged || loading;

  return (
    <DefaultLayout>
      {getTodoLoading && <h2>Loading...</h2>}
      {!getTodoLoading && (
        <div>
          <form onSubmit={handleSubmit}>
            <div>Todo {todoId}</div>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minLength={6}
              maxLength={120}
              pattern='^[0-9a-zA-Z\s]+$'
            />
            <Checkbox
              label="completed"
              value={checked}
              onChange={handleChecked}
            />
            <input type="submit" value="Save" disabled={disableCondition} />
          </form>
          <Button title="Remove" onClick={handleDelete} disabled={loading} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default React.memo(Todo);
