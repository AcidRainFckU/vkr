import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Course } from "../../../redux/course/types";

type Props = {
  id: number;
  UserCourse: any;
  title: string;
  course: Course[];
};

const MyCoursePlate: FC<Props> = ({ id, title, UserCourse, course }) => {
  const navigate = useNavigate();
  const currentCourse = course.filter((el) => el.id === UserCourse.courseId);

  return (
    <div
      className="drop-shadow-md bg-white rounded-2xl flex flex-col p-3 cursor-pointer"
      onClick={() => navigate(`/courses/${id}`)}
    >
      <div className="languages flex mb-3">
        <div className="language drop-shadow-md text-xs font-bold bg-white rounded-2xl px-3 mr-4 py-1">
          JavaScript
        </div>
      </div>

      <h3 className="text-xl mb-3">{title}</h3>
      <div className="bottom">
        <div className="description text-sm">
          <div>Разделов: {currentCourse[0].chapters.length}</div>
          <div>Уроков: {currentCourse[0].lesson.length}</div>
        </div>
      </div>
    </div>
  );
};

export default MyCoursePlate;
