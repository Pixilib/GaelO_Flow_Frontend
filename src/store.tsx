
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducers/UserSlice";
import DeleteSlice from "./reducers/DeleteSlice";

const store = configureStore({
  reducer: {
    user: UserSlice,
    delete : DeleteSlice
  },
  devTools: true,
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;