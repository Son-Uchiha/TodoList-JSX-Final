import { useEffect, useState } from "react";
import { clearTodos, getTodos, saveTodos } from "./utils/localStorageUtil";

function App() {
  // 1. Khởi tạo state bằng hàm getTodos() từ file util
  const [todos, setTodos] = useState(getTodos());
  // State quản lý input và trạng thái chỉnh sửa
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");
  // 2. Tự động lưu vào LocalStorage mỗi khi danh sách todos thay đổi
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);
  // Mở chế độ chỉnh sửa
  const startEdit = (todo) => {
    setIsEditing(todo.id);
    setEditText(todo.text);
  };
  // Thêm công việc (CREATE)
  const handleAdd = () => {
    if (!task.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTask("");
  };
  // Đánh dấu hoàn thành/chưa hoàn thành (UPDATE)
  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };
  // Xóa công việc (DELETE)
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  // Lưu nội dung sau khi chỉnh sửa (UPDATE)
  const saveEdit = (id) => {
    if (!editText.trim()) {
      setIsEditing(null);
      return;
    }
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo,
      ),
    );
    setIsEditing(null);
    setEditText("");
  };
  // Reset dữ liệu về bản mẫu ban đầu
  const handleReset = () => {
    if (
      window.confirm(
        "Bạn có chắc muốn xóa hết dữ liệu hiện tại và khôi phục dữ liệu mẫu?",
      )
    ) {
      clearTodos();
      setTodos(getTodos());
    }
  };
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between bg-teal-600 px-6 py-5 shadow-sm">
        <h1 className="text-2xl font-extrabold tracking-wide text-white uppercase">
          To-Do List
        </h1>
        <button
          onClick={handleReset}
          className="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-teal-700 shadow-sm transition-all duration-200 hover:bg-teal-50"
        >
          Khôi phục mẫu
        </button>
      </div>
      {/* Form Thêm Công Việc */}
      <div className="w-full border-b border-gray-200 bg-gray-50 px-6 py-5">
        <div className="flex items-center gap-3">
          <input
            className="flex-1 appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 leading-tight text-gray-700 transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            type="text"
            placeholder="Nhập công việc bạn cần làm..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className="rounded-lg bg-teal-600 px-5 py-2.5 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-teal-700"
            type="submit"
            onClick={handleAdd}
          >
            Thêm mới
          </button>
        </div>
      </div>

      {/* Danh sách Công Việc */}
      <ul className="divide-y divide-gray-100 px-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="group my-1 flex items-center justify-between rounded-lg p-4 transition-colors duration-150 hover:bg-gray-50"
          >
            <div className="flex w-full items-center overflow-hidden pr-4">
              <input
                type="checkbox"
                checked={todo.completed}
                className="h-5 w-5 cursor-pointer rounded border-gray-300 text-teal-600 transition-all focus:ring-teal-500"
                onChange={() => handleToggle(todo.id)}
              />
              {isEditing === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="ml-4 block w-full rounded-md border border-teal-400 bg-white p-1.5 text-base text-gray-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                ></input>
              ) : (
                <span
                  className={`ml-4 block truncate text-base transition-all duration-200 ${todo.completed ? "text-gray-400 line-through" : "font-medium text-gray-700"}`}
                >
                  {todo.text}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {isEditing === todo.id ? (
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="rounded-md bg-green-500 px-4 py-1.5 text-sm text-white shadow-sm transition-colors hover:bg-green-600"
                >
                  Lưu
                </button>
              ) : (
                <button
                  onClick={() => startEdit(todo)}
                  className="rounded-md bg-blue-500 px-4 py-1.5 text-sm text-white shadow-sm transition-colors hover:bg-blue-600"
                >
                  Sửa
                </button>
              )}

              <button
                onClick={() => handleDelete(todo.id)}
                className="rounded-md bg-red-600 px-4 py-1.5 text-sm text-white"
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
