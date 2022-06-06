import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAuth from "../../../hooks/auth";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { setAdminUsersAction } from "../../../redux/admin/users-admin.actions";
import AdminUserComponent from "./AdminUserComponent";
import SerchFrom from "./SerchFrom";

type Props = {};

const AdminUsers = (props: Props) => {
  const [filters, setFilters] = useState({
    userName: "",
    status: 0,
    role: "",
    email: "",
  });

  const users = useAppSelector((store) => store.usersAdmin);
  const dispatch = useDispatch();

  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
    dispatch(setAdminUsersAction(filters));
  }, []);

  const handleFilter = async (e: any) => {
    e.preventDefault();
    await dispatch(setAdminUsersAction(filters));
  };

  return (
    <div className="w-full  rounded-lg shadow-xs">
      <SerchFrom
        filters={filters}
        setFilters={setFilters}
        handleFilter={handleFilter}
      />
      <div className="w-full  mt-3">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b ">
              <th className="px-4 py-3">Пользователь</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Статус</th>
              <th className="px-4 py-3 text-center">Действия</th>
            </tr>
            {users?.map((el) => (
              <AdminUserComponent
                key={el.id}
                id={el.id}
                userName={el.userName}
                banned={el.banned}
                roles={el.role}
                email={el.email}
              />
            ))}
          </thead>
          <tbody className="bg-white divide-y "></tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
