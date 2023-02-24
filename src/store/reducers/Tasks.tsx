import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialTasks =
  typeof window !== "undefined" && localStorage.getItem("tasks");

const initialState = {
  toDo: null,
  inProgress: null,
  done: null,
};

export const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTodo: (state, payload: any) => {},
  },
});

export const { addTodo } = tasks.actions;
export const selectWishlist = (state: RootState) => state.tasks;

export default tasks.reducer;
