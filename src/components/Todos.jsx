// Todos.js
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, reorderTodo } from "../features/todo/todoSlice";
import PropTypes from "prop-types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MdEditNote } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

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
                        className="w-[18rem] xs:w-[28rem] sm:w-[38rem] md:w-[45rem] lg:w-[50rem] m-auto mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-800 px-4 py-2 rounded"
                      >
                        <div className="text-white w-full mb-2 sm:mb-0 text-justify">
                          {todo.text}
                        </div>
                        <div className="flex w-full sm:w-auto space-x-3">
                          <button
                            onClick={() => handleEditClick(todo)}
                            className={`w-full sm:w-auto text-white mb-2 sm:mb-0 border-0 py-1 px-4 focus:outline-none bg-yellow-500 hover:bg-yellow-600 rounded text-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center ${
                              isEditing ? "opacity-50" : ""
                            }`}
                            disabled={isEditing}
                          >
                            <MdEditNote size={`1.5rem`} />
                          </button>

                          <button
                            onClick={() => dispatch(removeTodo(todo.id))}
                            className={`w-full text-white mb-2 sm:mb-0 border-0 py-1 px-4 focus:outline-none bg-red-500 hover:bg-red-600 rounded text-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center sm:ml-2 ${
                              isEditing ? "opacity-50" : ""
                            }`}
                            disabled={isEditing}
                          >
                            <MdDeleteOutline size={`1.5rem`} />
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
  isEditing: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string,
};

export default Todos;
