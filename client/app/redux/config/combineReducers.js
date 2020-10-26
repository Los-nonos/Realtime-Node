import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import injectedReducers from "../../injectedReducers";
import history from "./history";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer() {
    return combineReducers({
        router: connectRouter(history),
        ...injectedReducers
    });
}
