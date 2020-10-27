import ErrorPage from "../containers/Error/ErrorPage";
import {Chat} from "@material-ui/icons";
import ChatComponent from '../containers/Chat';

const dashboardRoutes = [
    {
        path: "/error",
        name: "Error",
        icon: '',
        component: ErrorPage,
        layout: "/auth",
        rol: []
    },
    {
        path: '/chat',
        name: `Chat`,
        icon: Chat,
        component: ChatComponent,
        layout: '/dashboard',
        rol: [],
    }
];

export default dashboardRoutes;