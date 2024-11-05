import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppBase from "./base/AppBase";
import { Home, Login, Error, Users, Edit } from "./pages";

export const router = createBrowserRouter([
    {
        path: "",
        element: <Login />,
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
                path: "users/edit/:id",
                element: <Edit />,
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
