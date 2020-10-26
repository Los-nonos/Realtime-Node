import { all, takeEvery } from "redux-saga/effects";

function* sagas() {

}

export default function* rootSaga() {
    yield all([sagas()]);
}