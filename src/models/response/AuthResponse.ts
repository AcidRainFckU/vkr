import { IUser } from "../iUser";

export interface AuthResponse {
  accessToken: string;
  user: IUser;
}
