import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { Course } from "../../../redux/course/types";
import { User } from "../../../redux/user/types";
import PageLayout from "../../layouts/pageLayout";
import AllCourses from "./AllCourses";
import MyCourses from "./MyCourses";

type Props = {};

const HomePage: FC<Props> = (props: Props) => {
  const userStore: User = useAppSelector((store) => store.user);
  const coursesStore: Course[] = useAppSelector((store) => store.courses);

  const [user, setUser] = useState(userStore);
  const [course, setCourse] = useState(coursesStore);

  useEffect(() => {
    setUser(userStore);
    setCourse(coursesStore);
  }, [userStore, coursesStore]);

  return (
    <PageLayout>
      <div className="max-w-6xl mx-auto flex flex-col">
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
