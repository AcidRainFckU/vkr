import EditorJS from '@editorjs/editorjs';
import { useCallback, useRef, useState } from 'react';
import { createReactEditorJS } from 'react-editor-js';
import { useNavigate, useParams } from 'react-router-dom';
import { EDITOR_JS_TOOLS } from '../../../hooks/editor';
import CoruseService from '../../../services/CoursesService';
import PageLayout from '../../layouts/pageLayout';

const CreateLesson = () => {
  const EditorJs = createReactEditorJS();
  const editorCore = useRef<EditorJS>();
  const navigate = useNavigate();

  const { courseId, chapterId } = useParams();
  const [homework, setHomework] = useState(false);

  const [lessonCreate, setLessonCreate] = useState({
    title: '',
    text: '',
    chaptereId: Number(chapterId),
    courseId: Number(courseId),
    homework: homework,
  });

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current?.save();
    if (savedData) {
      console.log(savedData.blocks);
      const sentData = JSON.stringify(savedData.blocks);
      setLessonCreate((prev) => ({
        ...prev,
        text: sentData,
      }));
    }
  }, []);

  const handleInitialize = useCallback((instance: any) => {
    editorCore.current = instance;
  }, []);

  async function handleCreateChapter(e: any) {
    e.preventDefault();
    console.log(lessonCreate);
    const res = await CoruseService.createLesson(lessonCreate);
    console.log(res);
    if (res.status === 201) {
      alert('Урок успешно создан');
      setLessonCreate({
        title: '',
        text: '',
        chaptereId: Number(chapterId),
        courseId: Number(courseId),
        homework: homework,
      });
      setHomework(false);
      navigate('/courses');
    } else {
      alert('Что-то пошло не так!');
    }
  }

  return (
    <PageLayout>
      <div className="course__users  bg-white rounded-xl p-8 relative flex flex-col  ">
        <h4 className="text-xl text-center mb-8">Создание урока</h4>
        <form className="flex flex-col" onSubmit={(e) => handleCreateChapter(e)}>
          <input
            type="text"
            placeholder="Название..."
            className="px-3 py-2 create-lesson-header"
            value={lessonCreate.title}
            required
            onChange={(e) => setLessonCreate({ ...lessonCreate, title: e.target.value })}
          />

          <EditorJs tools={EDITOR_JS_TOOLS} onInitialize={handleInitialize} onChange={handleSave} />

          <label className="cursor-pointer">
            <input
              className="cursor-pointer"
              onChange={() =>
                setLessonCreate((prev) => ({
                  ...prev,
                  homework: !lessonCreate.homework,
                }))
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
