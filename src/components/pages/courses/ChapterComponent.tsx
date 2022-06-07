import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Lesson } from "../../../redux/course/types";

type Props = {
  title: string;
  id: number;
  lessons: Lesson[];
  courseId: string | undefined;
};

const ChapterComponent: FC<Props> = ({ title, id, lessons, courseId }) => {
  const currentLessons = lessons.filter((el) => el.chaptereId === id).reverse();

  return (
    <li className="relative mb-4">
      <h3 className="mb-2">{title}</h3>

      <ul
        className="relative accordion-collapse collapse"
        id="collapseSidenavEx1"
        aria-labelledby="sidenavEx1"
        data-bs-parent="#sidenavExample"
      >
        {currentLessons.map((el, i) => (
          <li key={el.id} className="relative">
            <Link
              to={`/courses/${courseId}/${el.chaptereId}/${el.id}`}
              className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              {el.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default ChapterComponent;
