import { actionNames } from "../utils/constants/actionConstants";

const stateDefault = {
    loading: false,
    error: { errors: {} },
    notification: false,
    notificationColor: "",
    message: "",
    notifications: [],
};

const generalReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case actionNames.loadingToggle:
            return { ...state, loading: !state.loading };
        case actionNames.closeNotification:
            return {
                ...state,
                notification: false,
                message: "",
                notificationColor: "",
                error: { errors: {} }
            };
        case actionNames.showNotification:
            return {
                ...state,
                notification: true,
                message: action.error
                    ? `Error ${action.error.code}, ${action.error.detail}`
                    : action.message,
                error: action.error ? action.error : { errors: {} },
                notificationColor: action.error ? "danger" : "success"
            };
        default:
            return state;
    }
};

export default generalReducer;
