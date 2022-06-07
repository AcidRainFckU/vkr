import React, { FC, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Course } from "../../../redux/course/types";
import { User } from "../../../redux/user/types";
import CoruseService from "../../../services/CoursesService";
import PageLayout from "../../layouts/pageLayout";

type Props = {
  course: Course[];
};

const LessonComponent: FC<Props> = ({ course }) => {
  const [link, setLink] = useState("");
  const navigate = useNavigate();
  const { courseId, chapterId, lessonId } = useParams();

  const userId: User = useAppSelector((store) => store.user);

  const lessonContent = course
    ?.filter((el) => el.id.toString() === courseId)[0]
    .lesson?.filter((el) => el.id.toString() === lessonId)[0];

  const chapterLessons = course
    ?.filter((el) => el.id.toString() === courseId)[0]
    .lesson?.filter((el) => el.chaptereId.toString() === chapterId);

  const handleNextLesson = () => {
    const index = chapterLessons.findIndex((i) => i.id.toString() === lessonId);
    if (index === 0) {
      navigate(`/courses/${courseId}`);
    } else {
      const nextLesson = chapterLessons[index - 1];
      navigate(`/courses/${courseId}/${chapterId}/${nextLesson.id}`);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await CoruseService.addHomework(lessonContent.id, Number(userId.id), link);

    alert("Домашнее задание отправлено на проверку");
  };

  return (
    <PageLayout>
      <button
        className="bg-indigo-600 text-white p-3 rounded-full active mb-5 px-5"
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
      <div className="lesson flex flex-col min-h-screen">
        <h3 className="text-4xl font-bold text-center mb-6">
          {lessonContent?.title}
        </h3>
        <div className="textfield max-w-4xl mx-auto">{lessonContent?.text}</div>
        <div className="bot mt-auto ml-auto mb-8 flex">
          {lessonContent?.homework && (
            <form
              className="flex flex-col w-80 mr-8"
              onSubmit={(e) => onSubmit(e)}
            >
              <input
                className="px-3 py-2 w-full"
                type="text"
                required
                placeholder="Ссылка на домашнее задание"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              <button className="ml-auto" type="submit">
                Отправить
              </button>
            </form>
          )}
          <button
            className="bg-indigo-600 text-white p-3 rounded-full active mb-5 px-5"
            onClick={handleNextLesson}
          >
            Далее
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default LessonComponent;
