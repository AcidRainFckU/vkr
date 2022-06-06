import { User, UserActionType } from "./types";

const initialState: User | null = null;

function userReducer(state = initialState, action: UserActionType) {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "LOGOUT":
      return null;
    case "CHANGE_SETTINGS":
      return {
        ...state,
        userName: action.payload.userName,
        email: action.payload.email,
      };

    default:
      return state;
  }
}

export default userReducer;
