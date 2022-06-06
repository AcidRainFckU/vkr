export enum UsersAdminEnum {
  SET_ADMIN_USERS = "SET_ADMIN_USERS",
  BAN_USER = "BAN_USER",
  SET_ROLE = "SET_ROLE",
}

interface SetUsersAdminAction {
  type: UsersAdminEnum.SET_ADMIN_USERS;
  payload: UsersAdmin[];
}
interface BanUserAdminAction {
  type: UsersAdminEnum.BAN_USER;
  payload: {
    id: number;
    status: boolean;
  };
}

interface SetRoleAction {
  type: UsersAdminEnum.SET_ROLE;
  payload: { id: string; role: string };
}

export type UsersAdminActionTypes =
  | SetUsersAdminAction
  | BanUserAdminAction
  | SetRoleAction;

export interface UsersAdmin {
  id: number;
  userName: string;
  banned: boolean;
  role: string;
  email: string;
}
