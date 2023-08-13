import { compose, createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const middleWars = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWars));

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
