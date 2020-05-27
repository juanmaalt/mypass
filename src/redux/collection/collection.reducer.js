import { CollectionActionTypes } from "./collection.types";

const INITIAL_STATE = {
  items: [],
};

const collectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CollectionActionTypes.UPDATE_COLLECTION:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
};

export default collectionReducer;
