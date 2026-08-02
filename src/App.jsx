import { useState } from "react";
import { getTodos } from "./utils/localStorageUtil";

function App() {
  const [todos, setTodos] = useState(getTodos());
  return <></>;
}

export default App;
