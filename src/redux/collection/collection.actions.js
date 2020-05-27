import { CollectionActionTypes } from "./collection.types";

export const addItemToCollection = (item) => ({
  type: CollectionActionTypes.ADD_ITEM,
  payload: item,
});

export const removeItemFromCollection = (item) => ({
  type: CollectionActionTypes.DELETE_ITEM,
  payload: item,
});

export const updateCollection = (collectionsMap) => ({
  type: CollectionActionTypes.UPDATE_COLLECTION,
  payload: collectionsMap
})