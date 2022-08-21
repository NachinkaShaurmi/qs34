import { useMutation, useQuery } from "@apollo/client";
import Checkbox from "components/Checkbox/Checkbox";
import DefaultLayout from "layout/DefaultLayout";
import { UPDATE_TODO } from "mutation/todo";
import { GET_ONE_TODO } from "query/todo";
import React, { FormEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ITodo } from "types";

const Todo = () => {
  const { id: todoId } = useParams();

  const { data, loading } = useQuery<{ todo: ITodo }>(GET_ONE_TODO, {
    variables: {
      id: todoId,
    },
  });

  const [newTodo] = useMutation(UPDATE_TODO);

  const [title, setTitle] = useState("");
  const [checked, setChecked] = useState(false);
  const [todo, setTodo] = useState<ITodo>();

  useEffect(() => {
    if (!loading && data?.todo) {
      const { completed, title } = data.todo;
      setTodo(data.todo);
      setTitle(title);
      setChecked(completed);
    }
  }, [data, loading]);

  const handleChecked = () => {
    setChecked(!checked);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    newTodo({
      variables: {
        id: todo?.id,
        input: {
          title,
          completed: checked,
        },
      },
    }).then(({ data }) => {
      console.log(data);
    });
  };
  const isChanged = todo?.completed !== checked || todo?.title !== title;
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
          <input type="submit" value="Save" disabled={!isChanged} />
        </form>
      )}
    </DefaultLayout>
  );
};

export default Todo;
