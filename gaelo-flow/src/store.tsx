import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducers/UserSlice";

const store = configureStore({
    reducer: {
      user: UserSlice,
      // Define a top-level state field named `todos`, handled by `todosReducer`
      //todos: todosReducer,
      // Define a top-level state field named `filters`, handled by `filtersReducer`
      //filters: filtersReducer
    },
    devTools:true
  })

  export {store}