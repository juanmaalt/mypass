import { ItemActionTypes } from "./item.types";

export const showItem = (item) => ({
  type: ItemActionTypes.SHOW_ITEM,
  payload: item
});

export const hideItem = () =>({
  type: ItemActionTypes.HIDE_ITEM,
})
