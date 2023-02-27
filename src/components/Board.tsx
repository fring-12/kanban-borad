import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addTask as updateNewTask,
  selectTasks,
  updateDnDItems as handleDragNDrop,
} from "../reducers/tasks";

const Board = () => {
  const tasks = useSelector(selectTasks);
  const [taskName, setTaskName] = useState("");
  const dispacth = useDispatch();

  const onDragNDrop = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = tasks[source.droppableId];
      const destColumn = tasks[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      dispacth(
        handleDragNDrop({
          sourceKey: source.droppableId,
          destinationKey: destination.droppableId,
          columns: tasks,
          destItems: destItems,
          sourceItems: sourceItems,
          sourceColumn: sourceColumn,
          destColumn: destColumn,
        })
      );
    } else {
      const column = tasks[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      dispacth(
        updateNewTask({
          key: source.droppableId,
          column: column,
          items: copiedItems,
        })
      );
    }
  };

  const addTask = () => {
    if(taskName.length < 1) return

    const column = tasks[`to_do`];
    const copiedItems = [...column.items];
    const id = uuidv4();
    dispacth(
      updateNewTask({
        key: "to_do",
        column: column,
        items: [...copiedItems, { id: id, content: taskName }],
      })
    );
    setTaskName("");
  };

  const renderTaskInput = () => {
    return (
      <div className="flex gap-2 items-center w-full justify-center mb-4">
        <input
          type={"text"}
          placeholder="Write your task..."
          onChange={(e) => setTaskName(e.target.value)}
          className="p-2 border border-gray-200 rounded-md w-80"
          value={taskName}
        />
        <button
          className="p-2 bg-[#456C86] text-white rounded-md"
          onClick={() => addTask()}
        >
          Add task
        </button>
      </div>
    );
  };

  return (
    <div>
      {renderTaskInput()}
      {tasks && (
        <div className="flex justify-center h-full w-full">
          <DragDropContext onDragEnd={(result) => onDragNDrop(result)}>
            {Object.entries(tasks).map(([columnId, column]) => {
              return (
                <div className="flex flex-col items-center" key={columnId}>
                  <h2>{column.name}</h2>
                  <div className="m-2">
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`${
                              snapshot.isDraggingOver
                                ? "bg-blue-200"
                                : "bg-gray-200"
                            } p-4 w-[250px] h-[500px] rounded-md overflow-y-scroll`}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`p-4 mb-2 mt-0 ml-0 mr-0 min-h-[50px] ${
                                          snapshot.isDragging
                                            ? "bg-[#456C86]"
                                            : "bg-[#2B3467]"
                                        } text-white rounded-md`}
                                      >
                                        {item.content}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

export default Board;
