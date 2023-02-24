import { combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "./tasks";

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
