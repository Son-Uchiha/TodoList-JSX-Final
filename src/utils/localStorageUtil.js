const STORAGE_KEY = "todos_data";

// Dữ liệu mẫu ban đầu
const sampleData = [
  { id: 1690000000001, text: "Thức dậy lúc 6:00 sáng", completed: true },
  { id: 1690000000002, text: "Đọc 10 trang sách", completed: false },
  { id: 1690000000003, text: "Học ReactJS & TailwindCSS", completed: false },
  {
    id: 1690000000004,
    text: "Viết file Util cho LocalStorage",
    completed: true,
  },
];

export const saveTodos = (todos) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Lỗi khi lưu LocalStorage:", error);
  }
};

export const getTodos = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    // Nếu chưa có data thì set dữ liệu mẫu và trả về dữ liệu mẫu
    saveTodos(sampleData);
    return sampleData;
  } catch (error) {
    console.error("Lỗi khi đọc LocalStorage:", error);
    return [];
  }
};

export const clearTodos = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Lỗi khi xóa LocalStorage:", error);
  }
};
