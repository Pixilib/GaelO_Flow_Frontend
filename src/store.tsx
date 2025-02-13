
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducers/UserSlice";
import DeleteSlice from "./reducers/DeleteSlice";
import AnonymizeSlice from "./reducers/AnonymizeSlice";
import AutoRetrieveSlice from "./reducers/AutoRetrieveSlice";
import ExportSlice from "./reducers/ExportSlice";
import JobSlice from './reducers/JobSlice'

const store = configureStore({
  reducer: {
    user: UserSlice,
    delete : DeleteSlice,
    anonymize : AnonymizeSlice,
    export : ExportSlice,
    autoRetrieve : AutoRetrieveSlice,
    job : JobSlice,
  },
  devTools: true,
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;