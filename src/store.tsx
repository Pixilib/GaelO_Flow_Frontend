
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducers/UserSlice";

const store = configureStore({
  reducer: {
    user: UserSlice,
  },
  devTools: true,
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;