import { FC } from "react";
import { Course } from "../../../redux/course/types";
import { User } from "../../../redux/user/types";
import MyCoursePlate from "./MyCoursePlate";

type Props = {
  course: Course[];
  user: User;
};

const MyCourses: FC<Props> = ({ course, user }) => {
  return (
    <div>
      <h2 className=" uppercase text-4xl font-black">Мои курсы</h2>
      <div className=" py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.course.map((el: any) => (
            <MyCoursePlate
              key={el.id}
              id={el.id}
              title={el.title}
              UserCourse={el.UserCourse}
              course={course}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
