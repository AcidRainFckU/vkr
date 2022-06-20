import { UsersAdmin } from "../../admin/types";

export enum CoursesEnum {
  SET_COURSES = "SET_COURSES",
  ADD_USER = "ADD_USER",
  REMOVE_USER = "REMOVE_USER",
  REMOVE_COURSE = "REMOVE_COURSE",
}

interface SetCoursesActionType {
  type: CoursesEnum.SET_COURSES;
  payload: Course;
}
interface AddUserActionType {
  type: CoursesEnum.ADD_USER | CoursesEnum.REMOVE_USER;
  payload: {
    courseId: number;
    users: UsersAdmin[];
  };
}

interface RemoveCourseActionType {
  type: CoursesEnum.REMOVE_COURSE
  payload: number 
}

export type CourseActionsType = SetCoursesActionType | AddUserActionType | RemoveCourseActionType;

export interface Lesson {
  id: number;
  title: string;
  text: string;
  courseId: number;
  chaptereId: number;
  homework: boolean;
}

export interface Chapter {
  id: number;
  title: string;
  courseId: number;
}
export interface Language {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  title: string;
  chapters: Chapter[];
  lesson: Lesson[];
  users: UsersAdmin[];
  languages: Language[];
}
