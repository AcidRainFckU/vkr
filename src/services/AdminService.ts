import $api from "../http";
import { AxiosResponse } from "axios";
import { GetUserResponse } from "../models/response/GetUsersResponse";

export interface GetAllUsers {
  userName: string;
  status: number;
  role: string;
  email: string;
}

export default class AdminService {
  static async getAllUsers(
    filters: GetAllUsers
  ): Promise<AxiosResponse<GetUserResponse[], GetUserResponse[]>> {
    return $api.post<GetUserResponse[]>("/users", filters);
  }

  static async banUser(id: number, status: boolean): Promise<AxiosResponse> {
    return $api.post("/users/ban", { id, status });
  }

  static async setRole(id: string, role: string) {
    return $api.post("/users/role", { id, role });
  }
}
