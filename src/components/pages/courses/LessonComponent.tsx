import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { Course } from '../../../redux/course/types';
import { User } from '../../../redux/user/types';
import CoruseService from '../../../services/CoursesService';
import PageLayout from '../../layouts/pageLayout';
import Paragraph from './Paragraph';

type Props = {
  course: Course[];
};

type Header = {
  text: string;
  level: number;
};
type ParagraphType = {
  text: string;
};
type Table = {
  withHeadings: boolean;
  content: Array<Array<string>>;
};
type List = {
  style: string;
  items: Array<string>;
};
type Code = {
  code: string;
};
type Row = {
  html: string;
};
type Link = {
  link: string;
  meta: any;
};
export interface LessonText {
  id?: string;
  type: string;
  data: Header | ParagraphType | Table | List | Code | Row | Link;
}

const LessonComponent: FC<Props> = ({ course }) => {
  const [textContent, setTextContent] = useState<LessonText[]>([]);

  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const userId: User = useAppSelector((store) => store.user);

  const [homework, setHomework] = useState<any>({
    link: '',
    lessonId: Number(lessonId),
    userId: userId?.id,
  });

  const lessonContent = course
    ?.filter((el) => el.id.toString() === courseId)[0]
    .lesson?.filter((el) => el.id.toString() === lessonId)[0];

  useEffect(() => {
    if (lessonContent?.text) {
      setTextContent(JSON.parse(lessonContent.text));
    }
  }, []);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (homework.link.length > 0) {
      await CoruseService.addHomework(homework);
      alert('Домашнее задание отправлено на проверку');
    } else {
      alert('Домашнее задание не должно быть пустым');
    }
  };
  return (
    <PageLayout>
      <button
        className="bg-indigo-600 text-white p-3 rounded-full active mb-5 px-5"
        onClick={() => navigate(-1)}>
        Назад
      </button>
      <div className="lesson flex flex-col min-h-screen">
        <h3 className="text-4xl font-bold text-center mb-6">{lessonContent?.title}</h3>
        <div className="textfield max-w-4xl mx-auto">
          {textContent.map((el) => (
            <Paragraph key={el.id} type={el.type} data={el.data} />
          ))}
        </div>
        <div className="bot mt-auto ml-auto mb-8 flex">
          {lessonContent?.homework && (
            <form className="flex flex-col w-80 mr-8" onSubmit={(e) => onSubmit(e)}>
              <input
                className="px-3 py-2 w-full"
                type="text"
                required
                placeholder="Ссылка на домашнее задание"
                value={homework.link}
                onChange={(e) => setHomework((prev: any) => ({ ...prev, link: e.target.value }))}
              />
              <button className="ml-auto" type="submit">
                Отправить
              </button>
            </form>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default LessonComponent;
