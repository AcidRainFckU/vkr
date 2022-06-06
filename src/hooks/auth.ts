import { useDispatch } from "react-redux";
import {
  checkAuthAction,
  loginAction,
  loogoutAction,
} from "../redux/user/user.actions";
import AuthService from "../services/AuthService";

const useAuth = () => {
  const dispatch = useDispatch();

  const login = async (email: string, password: string) => {
    try {
      dispatch(loginAction(email, password));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    userName: string
  ) => {
    try {
      await AuthService.registration(email, password, userName);
      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(loogoutAction());
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(checkAuthAction(token));
      }
    } catch (e) {
      logout();
    }
  };

  return {
    login,
    register,
    logout,
    checkAuth,
  };
};

export default useAuth;
