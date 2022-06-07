import { Course, CourseActionsType } from "./types";

const initialState: Course[] | null = null;

function coursesReducer(state = initialState, action: CourseActionsType) {
  switch (action.type) {
    case "SET_COURSES":
      return action.payload;

    case "ADD_USER":
      return state?.map((el) => {
        if (el.id === action.payload.courseId) {
          return {
            ...el,
            users: action.payload.users,
          };
        } else {
          return el;
        }
      });
    case "REMOVE_USER":
      return state?.map((el) => {
        if (el.id === action.payload.courseId) {
          return {
            ...el,
            users: action.payload.users,
          };
        } else {
          return el;
        }
      });
    default:
      return state;
  }
}

export default coursesReducer;
