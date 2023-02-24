import { configureStore } from "@reduxjs/toolkit";
import tasks from "./reducers/Tasks";

export const store = configureStore({
  reducer: {
    tasks: tasks,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
