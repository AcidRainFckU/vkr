import $api from "../http";

type CreateLesson = {
  title: string;
  text: string;
  chaptereId: number;
  courseId: number;
  homework: boolean;
};

export default class CoruseService {
  static async getAllCourses() {
    return $api.get("/course");
  }
  static async addUserToCourse(userId: number, courseId: number) {
    return $api.post("course/add-user", { userId, courseId });
  }
  static async removeUser(userId: number, courseId: number) {
    return $api.post("course/remove-user", { userId, courseId });
  }

  static async addHomework(userId: number, lessonId: number, link: string) {
    return $api.post("/homework", { userId, lessonId, link });
  }

  static async getHomework() {
    return $api.get("/homework");
  }
  static async checkHomework(complite: boolean, homeworkId: number) {
    return $api.post("/homework/check", { complite, homeworkId });
  }
  static async getAllLanguages() {
    return $api.get("/language");
  }
  static async createCourse(title: string, language: number) {
    return $api.post("course/create", { title, language });
  }
  static async createChapter(title: string, courseId: number) {
    return $api.post("chapter/create", { title, courseId });
  }
  static async createLesson(createLesson: CreateLesson) {
    return $api.post("lesson/create", createLesson);
  }
  static async createLanguage(name: string) {
    return $api.post("language/create", { name });
  }
}
