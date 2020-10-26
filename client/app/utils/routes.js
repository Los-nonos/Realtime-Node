const dashboardRoutes = [
    {
        path: "/error",
        name: "Error",
        icon: Login,
        component: ErrorPage,
        layout: "/auth",
        rol: []
    },
    {
        path: "/user-account",
        name: "CUENTA",
        icon: Settings,
        component: UserAccount,
        layout: "/dashboard",
        rol: []
    }
];

export default dashboardRoutes;