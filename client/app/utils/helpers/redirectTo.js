import { push } from "../../redux/config/history";

export const redirectTo = path => {
    push(path);
};

export const redirectToWithState = (path, state) => {
    push(path, state);
};

export const pages = {
    login: "/auth/login",
    products: "/dashboard/products",
    dashboard: "/dashboard/",
    error: "/auth/error",
    closeModal: "/close-modal",
    closePasswordModal: "/close-password-modal",
    closeUpdateModal: "/close-update-modal",
    search: "dashboard-website/search"
};
