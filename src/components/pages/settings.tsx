import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../redux/user/types";
import { changeUserSettingsAction } from "../../redux/user/user.actions";
import PageLayout from "../layouts/pageLayout";

type Props = {
  user: User;
};

const Settings: FC<Props> = ({ user }) => {
  const [userSettings, setUserSettings] = useState<User>(user);

  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await dispatch(changeUserSettingsAction(userSettings));
  };

  return (
    <PageLayout>
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="mx-auto w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h2 className="pt-4 text-2xl text-center">Данные пользователя</h2>
              <form
                className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="firstName"
                    >
                      ФИО*
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      onChange={(e) =>
                        setUserSettings({
                          ...userSettings,
                          userName: e.target.value,
                        })
                      }
                      value={userSettings?.userName}
                      required
                    />
                  </div>

                  {!userSettings?.banned && (
                    <h4 className="text-base italic text-green-500">
                      {userSettings?.role === "student"
                        ? "Студент"
                        : userSettings?.role === "mentor"
                        ? "Ментор"
                        : "Создатель"}
                    </h4>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email*
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    onChange={(e) =>
                      setUserSettings({
                        ...userSettings,
                        email: e.target.value,
                      })
                    }
                    value={userSettings?.email}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded-full hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Сохранить настройки
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Settings;
