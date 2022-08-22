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
      <Route path={URLS.Error} element={<>Error page</>} />
      <Route path={URLS.Others} element={<>Not found page</>} />
    </Routes>
  );
}

export default App;
