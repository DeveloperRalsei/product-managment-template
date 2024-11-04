import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppBase from "./base/AppBase";
import { Home, Login, Error, Users } from "./pages";

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
