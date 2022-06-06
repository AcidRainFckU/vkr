import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../../layouts/pageLayout";

interface Props {
  children: ReactNode;
  currentTab: number;
}

const AdminPanel: FC<Props> = ({ children, currentTab }) => {
  return (
    <PageLayout>
      <div className="flex mb-10 pb-5 bg-gray-50 ">
        <div className="flex flex-col flex-1 w-full">
          <main className="h-full">
            <div className="container px-6 mx-auto grid">
              <h2 className="my-6 text-2xl font-semibold text-gray-700 ">
                Панель администратора
              </h2>

              <div className="tabs grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                <Link
                  to="/admin"
                  className={
                    currentTab === 1
                      ? `flex items-center p-4 bg-white rounded-lg shadow-xs cursor-pointer  border-indigo-500 border-2`
                      : `flex items-center p-4 bg-white rounded-lg shadow-xs cursor-pointer border-white hover:border-indigo-500 border-2`
                  }
                >
                  <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full ">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-600 ">
                      Пользователи
                    </h4>
                  </div>
                </Link>

                <Link
                  to="/admin/cources"
                  className={
                    currentTab === 2
                      ? `flex items-center p-4 bg-white rounded-lg shadow-xs cursor-pointer  border-indigo-500 border-2`
                      : `flex items-center p-4 bg-white rounded-lg shadow-xs cursor-pointer border-white hover:border-indigo-500 border-2`
                  }
                >
                  <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full ">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className=" text-sm font-medium text-gray-600 ">Курсы</p>
                  </div>
                </Link>
              </div>
            </div>
            {children}
          </main>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminPanel;
