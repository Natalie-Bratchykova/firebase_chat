import Chat from "./components/Chat";
import ErrorPage from "./components/NoInternetErrorPage";
import Login from "./components/Login";
import { CHAT_ROUTE, ERROR_ROUTE, LOGIN_ROUTE } from "./utils/const";

export const publicRoutes = [
  { path: LOGIN_ROUTE, element: Login },
  {
    path: ERROR_ROUTE,
    element: ErrorPage,
  },
];

export const privateRoutes = [
  { path: CHAT_ROUTE, element: Chat },
  {
    path: ERROR_ROUTE,
    element: ErrorPage,
  },
];
