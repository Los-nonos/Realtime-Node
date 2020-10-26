import localStorageService from "./localStorageService";
// eslint-disable-next-line import/no-cycle
import auth from "../api/auth";
import { actionNames } from "../../utils/constants/actionConstants";
// eslint-disable-next-line import/no-cycle
import { dispatch } from "../../app";
import jwt from "../externalModules/jwt";

class AuthStorage {
    setSession = (token, roles = undefined) => {
        localStorageService.set("zeep-token", token);
        if (roles) {
            localStorageService.set("roles", roles);
        }
    };

    getRoles = () => {
        return localStorageService.get("roles");
    };

    getSession = () => {
        return localStorageService.get("zeep-token");
    };

    deleteSession = () => {
        localStorageService.remove("zeep-token");
        localStorageService.remove("roles");
    };

    renewToken = async (token = this.getSession()) => {
        const context = this;
        setTimeout(async () => {
            const response = await auth.renewToken(token);
            if (response.type === actionNames.renewToken) {
                context.setSession(response.token);
            }
            dispatch(response);
        }, (jwt.expiresIn(token) - 240) * 1000);
    };
}

export default new AuthStorage();
