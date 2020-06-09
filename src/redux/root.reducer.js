import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import itemReducer from "./item/item.reducer";
import collectionReducer from "./collection/collection.reducer";
import keysReducer from "./keys/keys.reducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  item: itemReducer,
  collection: collectionReducer,
  keys: keysReducer,
});

export default persistReducer(persistConfig, rootReducer);
