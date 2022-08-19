
import { Route, Routes } from "react-router-dom";
import TodosList from "pages/TodosList/TodosList";
import URLS from "urls";
import "./App.scss";


function App() {
  return (
    <Routes>
      <Route path={URLS.Base} element={<TodosList />}/>
      <Route path={URLS.New} element={<></>} />
      <Route path={URLS.Todo} element={<></>} />
    </Routes>
  );
}

export default App;
