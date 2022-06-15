import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Chapter, Language, Lesson } from "../../../redux/course/types";
import { User } from "../../../redux/user/types";

type Props = {
  id: number;
  chapters: Chapter[];
  languages: Language[];
  lessons: Lesson[];
  title: string;
};

const DefaultCoursePlate: FC<Props> = ({
  id,
  chapters,
  languages,
  title,
  lessons,
}) => {
  const user: User = useAppSelector((store) => store.user);
  const navigate = useNavigate();

  function onclick() {
    if (user?.role === "superuser" || user?.role === "mentor") {
      navigate(`/courses/${id}`);
    }
  }

  return (
    <div
      className="drop-shadow-md bg-white rounded-2xl flex flex-col p-3"
      style={
        user?.role === "superuser"
          ? { cursor: "pointer" }
          : user?.role === "mentor"
          ? { cursor: "pointer" }
          : {}
      }
      onClick={onclick}
    >
      <div className="languages flex mb-3">
        {languages.map((el) => (
          <div
            key={el.id}
            className="language drop-shadow-md text-xs font-bold bg-white rounded-2xl px-3 mr-4 py-1"
          >
            {el.name}
          </div>
        ))}
      </div>

      <h3 className="text-xl mb-3">{title}</h3>
      <div className="bottom">
        <div className="description text-sm">
          <div>Разделов: {chapters.length}</div>
          <div>Уроков: {lessons.length}</div>
        </div>
      </div>
    </div>
  );
};

export default DefaultCoursePlate;
