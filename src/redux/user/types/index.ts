export enum UserEnum {
  SET_USER = "SET_USER",
  LOGOUT = "LOGOUT",
  CHANGE_SETTINGS = "CHANGE_SETTINGS",
  SET_ROLE = "SET_ROLE",
}

interface LoginAction {
  type: UserEnum.SET_USER;
  payload: User;
}

interface LogoutAction {
  type: UserEnum.LOGOUT;
}

interface ChangeUserSettingsAction {
  type: UserEnum.CHANGE_SETTINGS;
  payload: { id: string; email: string; userName: string };
}

export type UserActionType =
  | LoginAction
  | LogoutAction
  | ChangeUserSettingsAction;

export interface User {
  id: string;
  email: string;
  userName: string;
  role: string;
  banned: boolean;
}
