import { Route, Routes } from "react-router-dom";
import TodosList from "pages/TodosList/TodosList";
import Todo from "pages/Todo/Todo";
import URLS from "urls";
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path={URLS.Base} element={<TodosList />} />
      <Route path={URLS.Todo} element={<Todo />}>
        <Route path={URLS.ID} element={<Todo />} />
      </Route>
    </Routes>
  );
}

export default App;
