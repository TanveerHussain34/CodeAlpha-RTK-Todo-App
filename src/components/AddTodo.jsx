import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../features/todo/todoSlice";

function AddTodo({
  todoText,
  setTodoText,
  isEditing,
  setIsEditing,
  editTodoId,
}) {
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (!todoText.trim()) {
      return;
    } else if (isEditing) {
      dispatch(updateTodo({ id: editTodoId, text: todoText }));
      setIsEditing(false);
    } else {
      dispatch(addTodo(todoText));
    }
    setTodoText("");
  };

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-6">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {isEditing ? "Update" : "Add Todo"}
      </button>
    </form>
  );
}

AddTodo.propTypes = {
  todoText: PropTypes.string.isRequired,
  setTodoText: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  editTodoId: PropTypes.string,
};

export default AddTodo;
