import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lesson } from '../../../redux/course/types';

type Props = {
  title: string;
  id: number;
  lessons: Lesson[];
  courseId: string | undefined;
  role: string;
};

const ChapterComponent: FC<Props> = ({ title, id, lessons, courseId, role }) => {
  const [openChapter, setOpenChapter] = useState(false);
  const [fileteredLesson, setFilteredLesson] = useState<Lesson[]>([]);

  const currentLessons = lessons.filter((el) => el.chaptereId === id).reverse();

  useEffect(() => {
    function sortByAge(arr: any) {
      arr?.sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
      return arr;
    }
    const arr = sortByAge(currentLessons);
    setFilteredLesson(arr);
  }, []);

  return (
    <li className="relative mb-4">
      <div
        style={openChapter ? { borderRadius: '15px 15px 0 0' } : { borderRadius: '15px' }}
        className="header__chaptre "
        onClick={() => setOpenChapter(!openChapter)}>
        <h3 className="mb-2 text-xl chapter__title">{title}</h3>
        {role === 'superuser' && (
          <div className="buttons">
            <Link
              to={`/courses/${courseId}/${id}/create-lesson`}
              className="x text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xs px-5 py-2.5 text-centermb-7  ">
              Добавить урок
            </Link>
          </div>
        )}
        <svg
          className="strelka-bottom-1"
          viewBox="0 0 60 100"
          style={openChapter ? { transform: 'rotate(90deg)' } : { transform: 'rotate(-90deg)' }}>
          <path d="M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z"></path>
        </svg>
      </div>

      <ul
        className="relative accordion-collapse collapse"
        id="collapseSidenavEx1"
        style={openChapter ? { height: '100%' } : { height: '0' }}>
        {fileteredLesson.map((el) => (
          <li key={el.id} className="relative">
            <Link
              to={`/courses/${courseId}/${el.chaptereId}/${el.id}`}
              className="flex items-center  py-4  pr-6 h-6 overflow-hidden text-base text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out">
              {el.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default ChapterComponent;
