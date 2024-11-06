import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppBase from "./base/AppBase";
import { Home, Login, Error, Users, Edit, Add, Delete, Logout } from "./pages";

export const router = createBrowserRouter([
    {
        path: "",
        element: <Login />,
    },
    {
        path: "logout",
        element: <Logout />,
    },
    {
        path: "dashboard",
        element: <AppBase />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "users",
                element: <Users />,
            },
            {
                path: "users/delete",
                element: <Delete />,
            },
            {
                path: "users/edit/:id",
                element: <Edit />,
            },
            {
                path: "users/add",
                element: <Add />,
            },
            {
                path: "*",
                element: <Error />,
            },
        ],
    },
    {
        path: "*",
        element: <Error />,
    },
]);

export default function Router() {
    return <RouterProvider router={router} />;
}
