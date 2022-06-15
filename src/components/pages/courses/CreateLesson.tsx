import { useEffect, useState } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { useParams } from 'react-router-dom';
import { EDITOR_JS_TOOLS } from '../../../hooks/editor';
import CoruseService from '../../../services/CoursesService';
import PageLayout from '../../layouts/pageLayout';

const ReactEditorJS = createReactEditorJS();

const CreateLesson = () => {
  const { courseId, chapterId } = useParams();
  const [homework, setHomework] = useState(false);

  const [lessonCreate, setLessonCreate] = useState({
    title: '',
    text: '',
    chaptereId: Number(chapterId),
    courseId: Number(courseId),
    homework: homework,
  });

  async function handleCreateChapter(e: any) {
    e.preventDefault();
    await CoruseService.createLesson(lessonCreate);
    alert('Урок успешно создан');
    setLessonCreate({
      title: '',
      text: '',
      chaptereId: Number(chapterId),
      courseId: Number(courseId),
      homework: homework,
    });
    setHomework(false);
    e.target.reset();
  }

  return (
    <PageLayout>
      <div className="course__users  bg-white rounded-xl p-8 relative flex flex-col  ">
        <h4 className="text-xl text-center mb-8">Создание урока</h4>

        <form className="flex flex-col" onSubmit={(e) => handleCreateChapter(e)}>
          <input
            type="text"
            placeholder="Название..."
            className="px-3 py-2"
            value={lessonCreate.title}
            onChange={(e) => setLessonCreate({ ...lessonCreate, title: e.target.value })}
          />
          <ReactEditorJS />
          <label className="cursor-pointer">
            <input
              className="cursor-pointer"
              onChange={() =>
                setLessonCreate({
                  ...lessonCreate,
                  homework: !lessonCreate.homework,
                })
              }
              type="checkbox"
            />
            <span> Домашнее задание</span>
          </label>
          <button className="mt-6 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xl px-5 py-2.5 text-centermb-7  ">
            Создать
          </button>
        </form>
      </div>
    </PageLayout>
  );
};

export default CreateLesson;
