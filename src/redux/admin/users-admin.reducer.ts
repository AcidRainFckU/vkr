import { UsersAdmin, UsersAdminActionTypes } from "./types";

const initialState: UsersAdmin[] | null = null;

function usersAdminReducer(
  state = initialState,
  action: UsersAdminActionTypes
) {
  switch (action.type) {
    case "SET_ADMIN_USERS":
      return action.payload;
    case "BAN_USER":
      return state?.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, banned: action.payload.status };
        } else {
          return el;
        }
      });
    case "SET_ROLE":
      return state?.map((el) => {
        if (el.id.toString() === action.payload.id) {
          return { ...el, role: action.payload.role };
        } else {
          return el;
        }
      });

    default:
      return state;
  }
}

export default usersAdminReducer;
