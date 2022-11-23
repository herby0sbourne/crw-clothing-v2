import { userSagas } from './user/userSaga';
import { all, call } from 'typed-redux-saga/macro';
import { categoriesSaga } from './categories/categoriesSaga';

export function* rootSaga() {
    yield* all([call(categoriesSaga), call(userSagas)]);
}
