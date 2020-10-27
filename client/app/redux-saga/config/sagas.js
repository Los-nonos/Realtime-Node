import { all, takeEvery } from "redux-saga/effects";
import {actionNames} from "../../utils/constants/actionConstants";
import { login, loginFailed } from "../Auth/LoginSagas";
import { saveSession, deleteSession, renewToken } from "../Auth/SessionSagas";
import { checkRoles } from "../Auth/permissionsSagas";


function* sagas() {
    yield takeEvery(actionNames.login, login);
    yield takeEvery(actionNames.saveSession, saveSession);
    yield takeEvery(actionNames.deleteSession, deleteSession);
    yield takeEvery(actionNames.renewToken, renewToken);
    yield takeEvery(actionNames.loginFailed, loginFailed);
    yield takeEvery(actionNames.checkRoles, checkRoles);
}

export default function* rootSaga() {
    yield all([sagas()]);
}