
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducers/UserSlice";
import JobSlice from "./reducers/JobSlice";
//import ModelSlice from "./reducers/ModelSlice";

const store = configureStore({
  reducer: {
    user: UserSlice,
    job: JobSlice,
    //model: ModelSlice,
  },
  devTools: true,
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;