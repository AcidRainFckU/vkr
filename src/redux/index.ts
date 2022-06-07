import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import usersAdminReducer from "./admin/users-admin.reducer";
import coursesReducer from "./course/course.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  usersAdmin: usersAdminReducer,
  courses: coursesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
