import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import { UsersAdmin } from "../../../../redux/admin/types";
import {
  addUserAction,
  removeUserAction,
} from "../../../../redux/course/course.actions";
import { Language } from "../../../../redux/course/types";
import { User } from "../../../../redux/user/types";

type Props = {
  id: number;
  users: UsersAdmin[];
  lessonsCount: number;
  chaptersCount: number;
  title: string;
  languages: Language[];
};

const CourseComponent: FC<Props> = ({
  id,
  users,
  lessonsCount,
  chaptersCount,
  title,
  languages,
}) => {
  const dispatch = useDispatch();
  const allUsers: UsersAdmin[] = useAppSelector((store) =>
    store.usersAdmin?.filter(
      (el) =>
        el.role === "student" &&
        el.banned === false &&
        !users.some((element) => element.id === el.id)
    )
  ) as UsersAdmin[];

  const navigate = useNavigate();

  const [user, setUser] = useState<UsersAdmin[]>(users);
  const [currentAllUsers, setCurrentAllUsers] =
    useState<UsersAdmin[]>(allUsers);

  const [userFilter, setUserFilter] = useState("");
  const [showUsers, setshowUsers] = useState(false);
  const [hasAllUsers, setHasAllUsers] = useState(false);

  useEffect(() => {
    if (!hasAllUsers) {
      const filteredArray = users.filter(
        (el) =>
          el.userName.includes(userFilter) || el.email.includes(userFilter)
      );
      setUser(filteredArray);
    } else {
      const filteredArray = allUsers.filter(
        (el) =>
          el.userName.includes(userFilter) || el.email.includes(userFilter)
      );
      setCurrentAllUsers(filteredArray);
    }
  }, [userFilter]);

  const handleAddUser = (userId: number) => {
    dispatch(addUserAction(userId, id));
  };
  const handleRemoveUser = (userId: number) => {
    dispatch(removeUserAction(userId, id));
  };

  useEffect(() => {
    setUser(users);
    setCurrentAllUsers(allUsers);
  }, [users]);

  return (
    <tr className="text-gray-700 ">
      <td className="px-4 py-3">
        <div className="mb-1">{title}</div>
        <div className="text-xs">
          Языки:
          {languages.map((el) => (
            <span key={el.id}> {el.name}</span>
          ))}
        </div>
      </td>
      <td className="px-4 py-3">{chaptersCount}</td>
      <td className="px-4 py-3">{lessonsCount}</td>
      <td className="px-4 py-3">
        <button onClick={() => setshowUsers(!showUsers)}>Студенты</button>
        <div
          className={`modal   fixed w-screen h-screen top-0 left-0 backdrop-blur-sm flex items-center justify-center `}
          style={!showUsers ? { display: "none" } : {}}
        >
          <div className="course__users drop-shadow-md bg-white rounded-xl p-8 relative">
            <div
              className="closeModal absolute top-4 right-4 cursor-pointer"
              onClick={() => setshowUsers(!showUsers)}
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

            <button
              className="bg-indigo-600 text-white p-3 rounded-full active mb-5"
              onClick={() => setHasAllUsers(!hasAllUsers)}
            >
              {!hasAllUsers ? "Добавить студента" : "Назад"}
            </button>
            <input
              type="text"
              placeholder="Поиск..."
              className="mb-5 w-full"
              onChange={(e) => setUserFilter(e.target.value)}
              value={userFilter}
            />

            {!hasAllUsers ? (
              <ul className=" max-h-72 overflow-auto  w-96">
                {user.map((el) => (
                  <li
                    key={el.id}
                    className="w-full flex items-center mb-3 px-4"
                  >
                    <div className=" w-full adduser__icon h-12 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                      {el.userName[0].toUpperCase()}
                    </div>
                    <div className=" w-full mr-3">
                      <div>{el.userName}</div>{" "}
                      <div className="text-xs w-full">{el.email}</div>{" "}
                    </div>
                    <button
                      className="adduser-button ml-auto bg-red-600 text-white font-semibold rounded-lg w-full "
                      onClick={() => handleRemoveUser(el.id)}
                    >
                      Удалить
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className=" max-h-72 overflow-auto  w-96">
                {currentAllUsers.map((el) => (
                  <li
                    key={el.id}
                    className="w-full flex items-center mb-3 px-4"
                  >
                    <div className=" w-full adduser__icon  h-12 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                      {el.userName[0].toUpperCase()}
                    </div>
                    <div className=" w-full mr-3">
                      <div>{el.userName}</div>{" "}
                      <div className="text-xs w-full">{el.email}</div>{" "}
                    </div>
                    <button
                      className="adduser-button ml-auto bg-green-600 text-white font-semibold rounded-lg w-full"
                      onClick={() => handleAddUser(el.id)}
                    >
                      Добавить
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <button onClick={() => navigate(`/courses/${id}`)}>
          Редактировать
        </button>
      </td>
    </tr>
  );
};

export default CourseComponent;
