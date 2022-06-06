import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { IUser } from "../models/iUser";

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }

  static async registration(
    email: string,
    password: string,
    userName: string
  ): Promise<AxiosResponse> {
    return $api.post<AuthResponse>("/registration", {
      email,
      password,
      userName,
    });
  }

  static async checkAuth(token: string): Promise<AxiosResponse<IUser>> {
    return $api.post("/verify", { token });
  }
}
