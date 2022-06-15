import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <main className="h-full pb-16 overflow-y-auto">
      <div className="container flex flex-col items-center px-6 mx-auto">
        <svg className="w-12 h-12 mt-8 text-red-200" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
            clipRule="evenodd"></path>
        </svg>
        <h1 className="text-6xl font-semibold text-gray-700 ">Страница не найдена</h1>
        <p className="text-gray-700 mt-3">
          <Link to="/courses" className="text-indigo-600 inline-block ml-1 hover:underline ">
            Вернуться к курсам
          </Link>
        </p>
      </div>
    </main>
  );
};

export default NotFoundPage;
