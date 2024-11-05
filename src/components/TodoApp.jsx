import { useState } from "react";
import AddTodo from "./AddTodo";
import Todos from "./Todos";

function TodoApp() {
  const [todoText, setTodoText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  return (
    <div>
      <AddTodo
        todoText={todoText}
        setTodoText={setTodoText}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editTodoId={editTodoId}
      />
      <Todos
        setTodoText={setTodoText}
        setIsEditing={setIsEditing}
        setEditTodoId={setEditTodoId}
      />
    </div>
  );
}

export default TodoApp;
