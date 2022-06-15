import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Course } from "../../../redux/course/types";
import { User } from "../../../redux/user/types";
import CoruseService from "../../../services/CoursesService";
import PageLayout from "../../layouts/pageLayout";
import AllCourses from "./AllCourses";
import MyCourses from "./MyCourses";

type Props = {};

const HomePage: FC<Props> = (props: Props) => {
  const userStore: User = useAppSelector((store) => store.user);
  const coursesStore: Course[] = useAppSelector((store) => store.courses);

  const [language, setLanguage] = useState([]);

  const [user, setUser] = useState(userStore);
  const [course, setCourse] = useState(coursesStore);
  const [search, setSearch] = useState({
    title: "",
    language: 0,
  });

  async function fetchLanguages() {
    const res = await CoruseService.getAllLanguages();
    setLanguage(res.data);
  }

  useEffect(() => {
    setUser(userStore);
    setCourse(coursesStore);
  }, [userStore, coursesStore]);

  useEffect(() => {
    fetchLanguages();
    if (search.language === 0) {
      const newArray = coursesStore?.filter((el) =>
        el.title.includes(search.title)
      );
      setCourse(newArray);
    } else {
      const newArray = coursesStore?.filter(
        (el) =>
          el.title.includes(search.title) &&
          el.languages.some((elem) => elem.id === search.language)
      );
      setCourse(newArray);
    }
  }, [search]);

  return (
    <PageLayout>
      <form className="flex items-center max-w-6xl mx-auto mb-4">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
            placeholder="Search"
            required
            value={search.title}
            onChange={(e) => setSearch({ ...search, title: e.target.value })}
          />
        </div>
      </form>
      <div className="languages max-w-6xl  mx-auto flex mb-3">
        <div
          className="cursor-pointer language drop-shadow-md text-xs font-bold bg-white rounded-2xl px-3 mr-7 py-1"
          onClick={() => setSearch({ ...search, language: 0 })}
        >
          Все
        </div>
        {language.map((el: any) => (
          <div
            key={el.id}
            className="cursor-pointer language mr-7 drop-shadow-md text-xs font-bold bg-white rounded-2xl px-3 py-1"
            onClick={() => setSearch({ ...search, language: el.id })}
          >
            {el.name}
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto flex flex-col mt-12">
        {user?.course.length > 0 && <MyCourses course={course} user={user} />}

        {course?.length > 0 ? (
          <AllCourses course={course} />
        ) : (
          <h2 className="m-auto text-center mt-5 text-xl">
            Доступных курсов нет
          </h2>
        )}
      </div>
    </PageLayout>
  );
};

export default HomePage;
