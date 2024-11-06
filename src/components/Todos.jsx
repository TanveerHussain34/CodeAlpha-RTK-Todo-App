// Todos.js
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, reorderTodo } from "../features/todo/todoSlice";
import PropTypes from "prop-types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function Todos({ setTodoText, setIsEditing, setEditTodoId, isEditing }) {
  const todos = useSelector((state) => state.todo.filteredTodos);
  const dispatch = useDispatch();

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setEditTodoId(todo.id);
    setTodoText(todo.text);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(reorderTodo(items));
  };

  return (
    <>
      {todos.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          You have no Todos.
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <ul
                className="list-none"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="w-[50rem] m-auto mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
                      >
                        <div className="text-white">{todo.text}</div>
                        <div>
                          <button
                            onClick={() => handleEditClick(todo)}
                            className={`text-white mr-3 border-0 py-1 px-4 focus:outline-none bg-yellow-500 hover:bg-yellow-600 rounded text-md disabled:bg-gray-400 disabled:cursor-not-allowed ${
                              isEditing ? "opacity-50" : ""
                            }`}
                            disabled={isEditing}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => dispatch(removeTodo(todo.id))}
                            className={`text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md disabled:bg-gray-400 disabled:cursor-not-allowed ${
                              isEditing ? "opacity-50" : ""
                            }`}
                            disabled={isEditing}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
}

Todos.propTypes = {
  setTodoText: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  setEditTodoId: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  isEditing: PropTypes.string.isRequired,
};

export default Todos;
