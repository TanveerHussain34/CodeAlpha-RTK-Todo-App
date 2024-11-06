// todoSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  filteredTodos: JSON.parse(localStorage.getItem("todos")) || [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = { id: nanoid(), text: action.payload };
      state.todos.unshift(todo);
      saveTodosToLocalStorage(state.todos);
      state.filteredTodos = state.todos;
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
      saveTodosToLocalStorage(state.todos);
      state.filteredTodos = state.todos;
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveTodosToLocalStorage(state.todos);
      state.filteredTodos = state.todos;
    },
    reorderTodo: (state, action) => {
      state.todos = action.payload;
      saveTodosToLocalStorage(state.todos);
      state.filteredTodos = state.todos;
    },
    searchTodo: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredTodos = state.todos.filter((todo) =>
        todo.text.toLowerCase().includes(query)
      );
    },
  },
});

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const { addTodo, removeTodo, updateTodo, reorderTodo, searchTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
