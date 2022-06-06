import $api from "../http";

export default class UserService {
  static async changeSettings(id: string, email: string, userName: string) {
    return $api.post("/users/settings", { id, email, userName });
  }
}
