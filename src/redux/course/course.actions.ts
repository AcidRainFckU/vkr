import { Dispatch } from "redux";
import CoruseService from "../../services/CoursesService";
import { CourseActionsType, CoursesEnum } from "./types";

export const setCoursesAction: any =
  () => async (dispatch: Dispatch<CourseActionsType>) => {
    try {
      const response = await CoruseService.getAllCourses();

      dispatch({
        type: CoursesEnum.SET_COURSES,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

export const addUserAction: any =
  (userId: number, courseId: number) =>
  async (dispatch: Dispatch<CourseActionsType>) => {
    try {
      const response = await CoruseService.addUserToCourse(userId, courseId);

      dispatch({
        type: CoursesEnum.ADD_USER,
        payload: {
          courseId: courseId,
          users: response.data.users,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

export const removeUserAction: any =
  (userId: number, courseId: number) =>
  async (dispatch: Dispatch<CourseActionsType>) => {
    try {
      const response = await CoruseService.removeUser(userId, courseId);

      dispatch({
        type: CoursesEnum.REMOVE_USER,
        payload: {
          courseId: courseId,
          users: response.data.users,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
