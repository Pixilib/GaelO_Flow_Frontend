
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducers/UserSlice";
import DeleteSlice from "./reducers/DeleteSlice";
import AnonymizeSlice from "./reducers/AnonymizeSlice";
import ExportSlice from "./reducers/ExportSlice";

const store = configureStore({
  reducer: {
    user: UserSlice,
    delete : DeleteSlice,
    anonymize : AnonymizeSlice,
    export : ExportSlice
  },
  devTools: true,
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;