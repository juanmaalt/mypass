import { ItemActionTypes } from "./item.types";

const INITIAL_STATE = {
  hidden: true,
  id: "",
  title: "",
  email: "",
  user: "",
  password: "",
};

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ItemActionTypes.SHOW_ITEM:
      return {
        hidden: false,
        id: action.payload.id,
        title: action.payload.title,
        email: action.payload.email,
        user: action.payload.user,
        password: action.payload.password,
      };
    case ItemActionTypes.HIDE_ITEM:
      return {
        hidden: true,
        id: "",
        title: "",
        email: "",
        user: "",
        password: "",
      };
    default:
      return state;
  }
};

export default itemReducer;
