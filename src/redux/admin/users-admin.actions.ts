import { Dispatch } from "redux";
import AdminService, { GetAllUsers } from "../../services/AdminService";
import UserService from "../../services/UserService";
import { UsersAdminActionTypes, UsersAdminEnum } from "./types";

export const setAdminUsersAction: any =
  (filters: GetAllUsers) =>
  async (dispatch: Dispatch<UsersAdminActionTypes>) => {
    try {
      const response = await AdminService.getAllUsers(filters);

      dispatch({
        type: UsersAdminEnum.SET_ADMIN_USERS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

export const banUsersAction: any =
  (id: number, status: boolean) =>
  async (dispatch: Dispatch<UsersAdminActionTypes>) => {
    try {
      const response = await AdminService.banUser(id, status);

      if (response) {
        dispatch({
          type: UsersAdminEnum.BAN_USER,
          payload: {
            id: id,
            status: status,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

export const setRoleAction: any =
  (id: string, role: string) =>
  async (dispatch: Dispatch<UsersAdminActionTypes>) => {
    try {
      await AdminService.setRole(id, role);
      dispatch({
        type: UsersAdminEnum.SET_ROLE,
        payload: {
          id: id,
          role: role,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
