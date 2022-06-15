import React, { FC, ReactNode, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Chapter, Course } from "../../redux/course/types";
import { User } from "../../redux/user/types";
import CoruseService from "../../services/CoursesService";
import PageLayout from "../layouts/pageLayout";
import ChapterComponent from "./courses/ChapterComponent";

type Props = {
  course: Course[];
};

const CoursePage: FC<Props> = ({ course }) => {
  const { courseId } = useParams<string>();
  const user: User = useAppSelector((store) => store.user);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [chapterCreate, setChapterCreate] = useState({
    title: "",
    courseId: courseId,
  });

  if (
    !user?.course?.some((el: Course) => el.id.toString() === courseId) &&
    user?.role !== "superuser" &&
    user?.role !== "mentor"
  ) {
    return <Navigate to="/courses" replace />;
  }

  const currentCourse = course?.filter(
    (el) => el.id.toString() === courseId
  )[0];

  async function handleCreateChapter(e: any) {
    e.preventDefault();
    await CoruseService.createChapter(
      chapterCreate.title,
      Number(chapterCreate.courseId)
    );
    alert("Раздел успешно создан");
  }

  return (
    <PageLayout>
      <h2 className=" text-3xl font-bold text-gray-500 mb-5">
        {currentCourse.title}
      </h2>
      {user?.role === "superuser" && (
        <button
          className="my-7 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xl px-5 py-2.5 text-centermb-7  "
          onClick={() => setShowCreateModal(!showCreateModal)}
        >
          Добавить раздел
        </button>
      )}
      <div
        className={`modal z-50 fixed w-screen h-screen top-0 left-0 backdrop-blur-sm flex items-center justify-center `}
        style={!showCreateModal ? { display: "none" } : {}}
      >
        <div className="course__users drop-shadow-md bg-white rounded-xl p-8 relative flex flex-col w-96">
          <h4 className="text-xl text-center mb-8">Добавить раздел</h4>
          <div
            className="closeModal absolute top-4 right-4 cursor-pointer"
            onClick={() => setShowCreateModal(!showCreateModal)}
          >
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              height="329pt"
              viewBox="0 0 329.26933 329"
              width="329pt"
            >
              <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
            </svg>
          </div>
          <form
            className="flex flex-col"
            onSubmit={(e) => handleCreateChapter(e)}
          >
            <input
              type="text"
              placeholder="Название..."
              className="px-3 py-2"
              value={chapterCreate.title}
              onChange={(e) =>
                setChapterCreate({ ...chapterCreate, title: e.target.value })
              }
            />
            <button className="mt-6 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xl px-5 py-2.5 text-centermb-7  ">
              Создать
            </button>
          </form>
        </div>
      </div>
      <div
        className="w-full h-full shadow-md bg-white p-7 "
        id="sidenavExample"
      >
        <ul className="relative flex flex-col">
          {currentCourse.chapters.map((el) => (
            <ChapterComponent
              key={el.id}
              id={el.id}
              title={el.title}
              lessons={currentCourse?.lesson}
              courseId={courseId}
              role={user?.role}
            />
          ))}
        </ul>
      </div>
    </PageLayout>
  );
};

export default CoursePage;
