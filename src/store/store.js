import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const middleWars = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWars));

export const store = createStore(rootReducer, undefined, composedEnhancers);
