// TodoApp.js
import { useState } from "react";
import AddTodo from "./AddTodo";
import Todos from "./Todos";

function TodoApp() {
  const [todoText, setTodoText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <AddTodo
        todoText={todoText}
        setTodoText={setTodoText}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editTodoId={editTodoId}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Todos
        setTodoText={setTodoText}
        setIsEditing={setIsEditing}
        setEditTodoId={setEditTodoId}
        isEditing={isEditing}
      />
    </div>
  );
}

export default TodoApp;
