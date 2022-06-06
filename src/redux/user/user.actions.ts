import { Dispatch } from "redux";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import { User, UserActionType, UserEnum } from "./types";

// Получение книнг при первом рендеринге
export const loginAction: any =
  (email: string, password: string) =>
  async (dispatch: Dispatch<UserActionType>) => {
    try {
      const response = await AuthService.login(email, password);

      localStorage.setItem("token", response.data.accessToken);

      dispatch({
        type: UserEnum.SET_USER,
        payload: response.data.user,
      });
    } catch (e) {
      console.log(e);
    }
  };

export const checkAuthAction: any =
  (token: string) => async (dispatch: Dispatch<UserActionType>) => {
    try {
      const response = await AuthService.checkAuth(token);
      dispatch({
        type: UserEnum.SET_USER,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };

export const loogoutAction = () => {
  return {
    type: UserEnum.LOGOUT,
  };
};

export const changeUserSettingsAction: any =
  (user: User) => async (dispatch: Dispatch<UserActionType>) => {
    try {
      await UserService.changeSettings(user.id, user.email, user.userName);

      dispatch({
        type: UserEnum.CHANGE_SETTINGS,
        payload: {
          id: user.id,
          email: user.email,
          userName: user.userName,
        },
      });
      alert("Данные успешно сохранены");
    } catch (e) {
      console.log(e);
    }
  };
