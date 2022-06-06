import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  banUsersAction,
  setRoleAction,
} from "../../../redux/admin/users-admin.actions";

type Props = {
  id: number;
  userName: string;
  banned: boolean;
  roles: string;
  email: string;
};

const AdminUserComponent: FC<Props> = ({
  id,
  userName,
  banned,
  roles,
  email,
}) => {
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  const [bannedUser, setBannedUser] = useState(banned);

  const [role, setRole] = useState<string>(roles);

  function handleBan() {
    setBannedUser(!bannedUser);
  }

  function handleSetRoles(role: string) {
    setRole(role);
    dispatch(setRoleAction(id, role));
  }

  useEffect(() => {
    if (load) {
      dispatch(banUsersAction(id, bannedUser));
    } else {
      setLoad(true);
    }
  }, [bannedUser]);

  return (
    <tr className="text-gray-700 ">
      <td className="px-4 py-3">
        <div className="flex items-center text-sm">
          <div>
            <p className="font-semibold">{userName}</p>
            <p className="text-xs text-gray-600">
              {role === "superuser"
                ? "Создатель"
                : role === "mentor"
                ? "Ментор"
                : "Ученик"}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">{email}</td>
      <td className="px-4 py-3 text-xs">
        {bannedUser ? (
          <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full ">
            Заблокирован
          </span>
        ) : (
          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full ">
            Не заблокирован
          </span>
        )}
      </td>
      {roles !== "superuser" && (
        <td className="px-4 py-3 text-sm">
          <div className="settings relative h-full flex items-center justify-around">
            {bannedUser ? (
              <button onClick={handleBan}>Разблокировать</button>
            ) : (
              <button onClick={handleBan}>Заблокировать</button>
            )}

            <div className="set-role relative">
              <h6 className="set-role__button text-center mb-2">
                Изменить роль
              </h6>
              <ul className="set-role__buttons  bg-white top-1/2 flex rounded-lg overflow-hidden ">
                <li
                  className="text-center p-2 cursor-pointer"
                  onClick={() => handleSetRoles("mentor")}
                  style={
                    role === "mentor"
                      ? {
                          backgroundColor: "rgb(21, 128, 61)",
                          color: "#fff",
                        }
                      : { backgroundColor: "#fff", color: "#000" }
                  }
                >
                  <button> Ментор </button>
                </li>
                <li
                  className="text-center p-2 cursor-pointer"
                  onClick={() => handleSetRoles("student")}
                  style={
                    role === "student"
                      ? {
                          backgroundColor: "rgb(21, 128, 61)",
                          color: "#fff",
                        }
                      : { backgroundColor: "#fff", color: "#000" }
                  }
                >
                  <button> Студент </button>
                </li>
              </ul>
            </div>
          </div>
        </td>
      )}
    </tr>
  );
};

export default AdminUserComponent;
