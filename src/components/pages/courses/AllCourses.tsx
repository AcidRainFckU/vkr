import React, { FC } from "react";
import { Course } from "../../../redux/course/types";
import DefaultCoursePlate from "./DefaultCoursePlate";

type Props = {
  course: Course[];
};

const AllCourses: FC<Props> = ({ course }) => {
  return (
    <div>
      <h2 className=" uppercase text-4xl font-black">Все курсы</h2>
      <div className=" py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {course.map((el) => (
            <DefaultCoursePlate
              key={el.id}
              id={el.id}
              chapters={el.chapters}
              languages={el.languages}
              lessons={el.lesson}
              title={el.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
