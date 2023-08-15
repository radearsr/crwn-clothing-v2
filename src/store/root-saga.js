import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories/category.saga';

export function* rootSaga() {
  console.log("rootSaga");
  yield all([call(categoriesSaga)]);
}
