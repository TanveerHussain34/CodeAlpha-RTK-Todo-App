import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";
import PropTypes from "prop-types";

function Todos({ setTodoText, setIsEditing, setEditTodoId }) {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setEditTodoId(todo.id);
    setTodoText(todo.text);
  };

  return (
    <>
      {todos.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          You have no Todos.
        </div>
      ) : (
        <ul className="list-none">
          {todos.map((todo) => (
            <li
              className="w-[50rem] m-auto mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
              key={todo.id}
            >
              <div className="text-white">{todo.text}</div>
              <div>
                <button
                  onClick={() => handleEditClick(todo)}
                  className="text-white mr-3 border-0 py-1 px-4 focus:outline-none bg-yellow-500 hover:bg-yellow-600 rounded text-md"
                >
                  <svg
                    fill="#ffffff"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 528.899 528.899"
                    stroke="#ffffff"
                    className="w-6 h-6"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z"></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </button>
                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

Todos.propTypes = {
  setTodoText: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  setEditTodoId: PropTypes.func.isRequired,
};

export default Todos;
