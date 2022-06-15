import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { Course } from "../../../../redux/course/types";
import CoruseService from "../../../../services/CoursesService";
import CourseComponent from "./Course";

const CoursesComponent = () => {
  const store: Course[] = useAppSelector((store) => store.courses);
  const [courses, setCourses] = useState(store);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateLanguageModal, setShowCreateLanguageModal] = useState(false);
  const [language, setLanguage] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");

  const [createState, setCreateState] = useState({
    title: "",
    language: 1,
  });

  async function fetchLanguages() {
    const res = await CoruseService.getAllLanguages();
    setLanguage(res.data);
  }

  async function handleCreateCourse(e: any) {
    e.preventDefault();
    await CoruseService.createCourse(createState.title, createState.language);
    alert("Курс успешно создан");
  }
  async function handleCreateLanguage(e: any) {
    e.preventDefault();
    await CoruseService.createLanguage(newLanguage);
    alert("Язык успешно добавлен");
  }

  useEffect(() => {
    setCourses(store);
    fetchLanguages();
  }, [store]);
  return (
    <div className="w-full  rounded-lg shadow-xs">
      <div className="w-full  mt-3">
        <div className="buttons flex">
          <button
            onClick={() => setShowCreateModal(!showCreateModal)}
            className="ml-7 mb-8   text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xl px-5 py-2.5 text-centermb-7  "
          >
            Новый курс
          </button>
          <button
            onClick={() => setShowCreateLanguageModal(!showCreateLanguageModal)}
            className="ml-7 mb-8  text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xl px-5 py-2.5 text-centermb-7  "
          >
            Добавить язык
          </button>
        </div>

        <div
          className={`modal   fixed w-screen h-screen top-0 left-0 backdrop-blur-sm flex items-center justify-center `}
          style={!showCreateLanguageModal ? { display: "none" } : {}}
        >
          <div className="course__users drop-shadow-md bg-white rounded-xl p-8 relative flex flex-col w-96">
            <h4 className="text-xl text-center mb-8">Добавить язык</h4>
            <div
              className="closeModal absolute top-4 right-4 cursor-pointer"
              onClick={() =>
                setShowCreateLanguageModal(!showCreateLanguageModal)
              }
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
              onSubmit={(e) => handleCreateLanguage(e)}
            >
              <input
                type="text"
                placeholder="Название..."
                className="px-3 py-2"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
              />

              <button className="mt-6 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xl px-5 py-2.5 text-centermb-7  ">
                Создать
              </button>
            </form>
          </div>
        </div>
        <div
          className={`modal   fixed w-screen h-screen top-0 left-0 backdrop-blur-sm flex items-center justify-center `}
          style={!showCreateModal ? { display: "none" } : {}}
        >
          <div className="course__users drop-shadow-md bg-white rounded-xl p-8 relative flex flex-col w-96">
            <h4 className="text-xl text-center mb-8">Создание круса</h4>
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
              onSubmit={(e) => handleCreateCourse(e)}
            >
              <input
                type="text"
                placeholder="Название..."
                className="px-3 py-2"
                value={createState.title}
                onChange={(e) =>
                  setCreateState({ ...createState, title: e.target.value })
                }
              />
              <select
                onChange={(e) =>
                  setCreateState({
                    ...createState,
                    language: e.target.selectedIndex + 1,
                  })
                }
                className="px-3 py-2 my-5"
              >
                {language?.map((el: any) => (
                  <option key={el.id}>{el.name}</option>
                ))}
              </select>
              <button className="mt-6 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xl px-5 py-2.5 text-centermb-7  ">
                Создать
              </button>
            </form>
          </div>
        </div>

        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b ">
              <th className="px-4 py-3">Название</th>
              <th className="px-4 py-3">Количество разделов</th>
              <th className="px-4 py-3">Количество уроков</th>
              <th className="px-4 py-3"></th>
            </tr>
            {courses.map((el) => (
              <CourseComponent
                key={el.id}
                id={el.id}
                users={el.users}
                lessonsCount={el.lesson.length}
                chaptersCount={el.chapters.length}
                title={el.title}
                languages={el.languages}
              />
            ))}
          </thead>
        </table>
      </div>
    </div>
  );
};

export default CoursesComponent;
