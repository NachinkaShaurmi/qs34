import { Route, Routes } from "react-router-dom";
import TodosList from "pages/TodosList/TodosList";
import Todo, { TodoType } from "pages/Todo/Todo";
import URLS from "urls";
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path={URLS.Base} element={<TodosList />} />
      <Route path={URLS.New} element={<Todo type={TodoType.Create} />} />
      <Route path={URLS.Todo}>
        <Route path={URLS.ID} element={<Todo type={TodoType.Update}/>} />
      </Route>
    </Routes>
  );
}

export default App;
