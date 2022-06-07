import React, { useEffect, useState } from "react";
import CoruseService from "../../../services/CoursesService";
import PageLayout from "../../layouts/pageLayout";

type Props = {};

const HomeworksPage = (props: Props) => {
  const [homeworks, setHomeworks] = useState([]);

  async function fetchHomeworks() {
    const res = await CoruseService.getHomework();
    setHomeworks(res.data);
  }

  useEffect(() => {
    fetchHomeworks();
  }, []);

  const handleCheck = async (complite: boolean, homeworkId: number) => {
    const res = await CoruseService.checkHomework(complite, homeworkId);
    fetchHomeworks();
  };

  return (
    <PageLayout>
      {" "}
      <div className="w-full  rounded-lg shadow-xs">
        <div className="w-full  mt-3">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b ">
                <th className="px-4 py-3">Пользователь</th>
                <th className="px-4 py-3">Урок</th>
                <th className="px-4 py-3">ссылка</th>
                <th className="px-4 py-3">Статус</th>
              </tr>
            </thead>

            <tbody>
              {homeworks.map((el: any) => (
                <tr
                  key={el.id}
                  className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b "
                >
                  <th className="px-4 py-3">
                    <div>{el.user.userName}</div>
                    <div>{el.user.email}</div>
                  </th>
                  <th className="px-4 py-3">{el.lesson.title}</th>
                  <th className="px-4 py-3">{el.link}</th>
                  <th className="px-4 py-3">
                    {el.complete ? (
                      "Провереное"
                    ) : (
                      <button
                        className="bg-indigo-600 text-white p-3 rounded-full active mb-5"
                        onClick={() => handleCheck(true, el.id)}
                      >
                        Отметить как проверенное
                      </button>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default HomeworksPage;
