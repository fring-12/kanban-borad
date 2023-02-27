import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface Task {
  [key: string]: {
    name: string;
    items: {
      id: string;
      content: string;
    }[];
  };
}

interface TasksState {
  tasks: Task;
}

const localStorageValue =
  typeof window !== "undefined" ? localStorage.getItem("tasks") : null;

const columnsValue = {
  to_do: {
    name: "To do",
    items: [],
  },
  in_progress: {
    name: "In Progress",
    items: [],
  },
  done: {
    name: "Done",
    items: [],
  },
};

const initialState: TasksState = {
  tasks: JSON.parse(localStorageValue) || columnsValue,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, payload) => {
      const { key, column, items } = payload.payload;
      let updatedValue = {
        ...state.tasks,
        [key]: {
          ...column,
          items: items,
        },
      };
      state.tasks = updatedValue;
      localStorage.setItem("tasks", JSON.stringify(updatedValue));
    },
    updateDnDItems: (state, payload) => {
      const {
        sourceKey,
        destinationKey,
        columns,
        destItems,
        sourceItems,
        sourceColumn,
        destColumn,
      } = payload.payload;

      let updatedValue = {
        ...columns,
        [sourceKey]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destinationKey]: {
          ...destColumn,
          items: destItems,
        },
      };
      state.tasks = updatedValue;
      localStorage.setItem("tasks", JSON.stringify(updatedValue));
    },
  },
});

export const { addTask, updateDnDItems } = tasksSlice.actions;
export const selectTasks = (state: RootState) => state.tasks.tasks;

export default tasksSlice.reducer;
