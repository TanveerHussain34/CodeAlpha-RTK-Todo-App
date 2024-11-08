// AddTodo.js
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo, searchTodo } from "../features/todo/todoSlice";
import { CiSearch } from "react-icons/ci";

function AddTodo({
  todoText,
  setTodoText,
  isEditing,
  setIsEditing,
  editTodoId,
  searchTerm,
  setSearchTerm,
}) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (!todoText.trim()) return;

    if (isEditing) {
      inputRef.current.focus();
      dispatch(updateTodo({ id: editTodoId, text: todoText }));
      setIsEditing(false);
    } else {
      dispatch(addTodo(todoText));
    }
    setTodoText("");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    dispatch(searchTodo(e.target.value));
  };

  const toggleSearchMode = () => {
    setIsSearching(!isSearching);
    setTodoText("");
    setSearchTerm("");
    dispatch(searchTodo(""));
  };

  useEffect(() => {
    if (isSearching || isEditing) inputRef.current.focus();
  }, [isSearching, isEditing]);

  return (
    <form
      onSubmit={addTodoHandler}
      className="mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center items-center"
    >
      <button
        type="button"
        onClick={toggleSearchMode}
        className="w-full sm:w-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg flex items-center justify-center"
      >
        <CiSearch className="text-[1.75rem] font-bold" />
      </button>
      <input
        ref={inputRef}
        type="text"
        className="w-full sm:w-auto bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder={isSearching ? "Search Todos..." : "Enter a Todo..."}
        value={isSearching ? searchTerm : todoText}
        onChange={(e) => {
          if (isSearching) handleSearch(e);
          else setTodoText(e.target.value);
        }}
      />
      <button
        id="editButton"
        type="submit"
        className="w-full sm:w-auto text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg"
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
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
};

export default AddTodo;
