import React, { FC, ReactNode, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Chapter, Course } from "../../redux/course/types";
import { User } from "../../redux/user/types";
import PageLayout from "../layouts/pageLayout";
import ChapterComponent from "./courses/ChapterComponent";

type Props = {
  course: Course[];
};

const CoursePage: FC<Props> = ({ course }) => {
  const { courseId } = useParams<string>();
  const user: User = useAppSelector((store) => store.user);

  if (
    !user?.course?.some((el: Course) => el.id.toString() === courseId) &&
    user?.role !== "superuser"
  ) {
    return <Navigate to="/courses" replace />;
  }

  const currentCourse = course?.filter(
    (el) => el.id.toString() === courseId
  )[0];

  return (
    <PageLayout>
      <h2 className=" text-3xl font-bold text-gray-500 mb-5">
        {currentCourse.title}
      </h2>
      <div
        className="w-full h-full shadow-md bg-white p-7 "
        id="sidenavExample"
      >
        <ul className="relative flex flex-col-reverse">
          {currentCourse.chapters.map((el) => (
            <ChapterComponent
              key={el.id}
              id={el.id}
              title={el.title}
              lessons={currentCourse?.lesson}
              courseId={courseId}
            />
          ))}
        </ul>
      </div>
    </PageLayout>
  );
};

export default CoursePage;
