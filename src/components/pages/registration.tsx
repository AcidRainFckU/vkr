import { FC, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/auth";
import { useAppSelector } from "../../hooks/useAppSelector";

type Props = {};

const Registration: FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const user = useAppSelector((store) => store.user);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const { register } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await register(email, password, userName);
    if (res) {
      navigate("/login", { replace: true });
    }
  };

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div
          className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
           px-6 py-10 sm:px-10 sm:py-6 
           bg-white rounded-lg shadow-md lg:shadow-lg"
        >
          <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Регистрация
          </h2>

          <form className="mt-10" onSubmit={(e) => handleSubmit(e)}>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-600 uppercase"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="block w-full py-3 px-1 mt-2 
                   text-gray-800 appearance-none 
                   border-b-2 border-gray-100
                   focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
            />
            <label
              htmlFor="email"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              ФИО
            </label>
            <input
              id="fio"
              type="text"
              name="fio"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              className="block w-full py-3 px-1 mt-2 
                   text-gray-800 appearance-none 
                   border-b-2 border-gray-100
                   focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
            />

            <label
              htmlFor="password"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Пароль
            </label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="block w-full py-3 px-1 mt-2 mb-4
                   text-gray-800 appearance-none 
                   border-b-2 border-gray-100
                   focus:text-gray-500 focus:outline-none focus:border-gray-200"
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                   font-medium text-white uppercase
                   focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Зарегистрироваться
            </button>

            <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
              <Link to="/login" className="flex-2 underline">
                Есть аккаунт?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
