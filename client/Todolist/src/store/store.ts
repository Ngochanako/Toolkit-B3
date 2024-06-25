import { configureStore } from "@reduxjs/toolkit";
import TasksReducer from "./reducers/TasksReducer";
import ModalReducer from "./reducers/ModalReducer";

export const store=configureStore({
    reducer:{
      tasks:TasksReducer,
      modal:ModalReducer,
    }
})