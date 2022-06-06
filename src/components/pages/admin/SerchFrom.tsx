import React, { FC, useState } from "react";
import { GetAllUsers } from "../../../services/AdminService";

type Props = {
  filters: GetAllUsers;
  setFilters: any;
  handleFilter: any;
};

const SerchFrom: FC<Props> = ({ filters, setFilters, handleFilter }) => {
  const [show, setShow] = useState("hidden");

  const handleShowChange = () => {
    if (show === "hidden") {
      setShow("");
    } else {
      setShow("hidden");
    }
  };

  const handleReset = () => {
    setFilters({
      userName: "",
      status: 0,
      role: "",
      email: "",
    });
  };

  return (
    <form className="px-4" onSubmit={(e) => handleFilter(e)}>
      <div className="flex">
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 "
          type="button"
          onClick={handleShowChange}
        >
          Расширенный поиск{" "}
          <svg
            className="ml-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Введите имя..."
            onChange={(e) =>
              setFilters({ ...filters, userName: e.target.value })
            }
            value={filters.userName}
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        id="dropdown"
        className={`${show} w-full  bg-white rounded divide-y divide-gray-100 shadow flex flex-col`}
      >
        <ul className="py-1 text-sm text-gray-700 ">
          <li className="my-3">
            <input
              className="inline-flex py-2 px-4 w-full hover:bg-gray-100 "
              type="text"
              onChange={(e) =>
                setFilters({ ...filters, userName: e.target.value })
              }
              value={filters.userName}
              placeholder="Имя"
            />
          </li>
          <li className="my-3">
            <input
              className="inline-flex py-2 px-4 w-full hover:bg-gray-100 "
              type="text"
              onChange={(e) =>
                setFilters({ ...filters, email: e.target.value })
              }
              value={filters.email}
              placeholder="Email"
            />
          </li>
          <li className="py-3">
            <label className="cursor-pointer px-2 mx-3 items-center inline-flex">
              Все
              <input
                defaultChecked
                className="ml-3 cursor-pointer "
                type="radio"
                name="role"
                value=""
                onClick={(event) =>
                  setFilters({
                    ...filters,
                    role: (event.target as HTMLInputElement).value,
                  })
                }
              />
            </label>
            <label className="cursor-pointer px-2 mx-3 items-center inline-flex">
              Менторы
              <input
                className="ml-3 cursor-pointer "
                type="radio"
                name="role"
                value="mentor"
                onClick={(event) =>
                  setFilters({
                    ...filters,
                    role: (event.target as HTMLInputElement).value,
                  })
                }
              />
            </label>
            <label className="cursor-pointer px-2 mx-3 items-center inline-flex">
              Студенты
              <input
                className="ml-3 cursor-pointer "
                type="radio"
                name="role"
                value="student"
                onClick={(event) =>
                  setFilters({
                    ...filters,
                    role: (event.target as HTMLInputElement).value,
                  })
                }
              />
            </label>
          </li>

          <li className="py-3">
            <label className="cursor-pointer px-2 mx-3 items-center inline-flex">
              Все
              <input
                defaultChecked
                className="ml-3 cursor-pointer "
                type="radio"
                name="ban"
                value={0}
                onClick={(event) =>
                  setFilters({
                    ...filters,
                    status: Number((event.target as HTMLInputElement).value),
                  })
                }
              />
            </label>
            <label className="cursor-pointer px-2 mx-3 items-center inline-flex">
              Заблокированные
              <input
                className="ml-3 cursor-pointer "
                type="radio"
                name="ban"
                value={2}
                onClick={(event) =>
                  setFilters({
                    ...filters,
                    status: Number((event.target as HTMLInputElement).value),
                  })
                }
              />
            </label>
            <label className="cursor-pointer px-2 mx-3 items-center inline-flex">
              Незаблокированные
              <input
                className="ml-3 cursor-pointer "
                type="radio"
                name="ban"
                value={1}
                onClick={(event) =>
                  setFilters({
                    ...filters,
                    status: Number((event.target as HTMLInputElement).value),
                  })
                }
              />
            </label>
          </li>
        </ul>
        <button
          type="button"
          className="bg-indigo-500 hover:bg-indigo-700 my-4 ml-3 mr-auto text-white font-bold py-2 px-4 rounded-full"
          onClick={handleReset}
        >
          Сбросить настройки
        </button>
      </div>
    </form>
  );
};

export default SerchFrom;
