import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/auth";
import { useAppSelector } from "../hooks/useAppSelector";
import { User } from "../redux/user/types";

type Props = {};

const Header: FC<Props> = (props: Props) => {
  const user: User = useAppSelector((store) => store.user);

  const { logout } = useAuth();

  return (
    <nav className="navbar container flex justify-between py-8 mx-auto bg-white">
      <div className="items-center hidden space-x-8 lg:flex">
        <NavLink to="/courses">Главная</NavLink>
        {user?.role === "superuser" && (
          <NavLink
            to="/admin"
            className={"bg-indigo-600 text-white p-3 rounded-full"}
          >
            Панель администратора
          </NavLink>
        )}
        {user?.role !== "student" && (
          <NavLink
            to="/homeworks"
            className={"bg-red-600 text-white p-3 rounded-full"}
          >
            Домашние задания
          </NavLink>
        )}
      </div>
      <div className="flex items-center space-x2">
        <div className="header__profile flex mr-8 cursor-default">
          <div className="p-2 rounded-full bg-blue-50 w-12 text-center mr-3 cursor-default">
            {user?.userName[0].toUpperCase()}
          </div>
          <div className="header__profile-info">
            <h6>{user?.userName}</h6>
            <h5 className="text-sm">
              Роль:{" "}
              <span>
                {user?.role === "superuser"
                  ? "Создатель"
                  : user?.role === "mentor"
                  ? "Ментор"
                  : "Студент"}
              </span>
            </h5>
          </div>
        </div>

        <div className="settings  mx-2 relative h-full flex items-center">
          <button className="settings__activate">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-black-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <div className="settings__list absolute left-2/4 -translate-x-2/4">
            <ul className="list flex flex-col items-center ">
              <li className="list__item">
                <Link to="/settings" className="item__button">
                  Настройки
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="settings relative h-full flex items-center">
          <button className="settings__activate" onClick={logout}>
            <svg className="w-6 " focusable="false" viewBox="0 0 24 24">
              <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
