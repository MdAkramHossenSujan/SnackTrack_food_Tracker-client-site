import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layout/Rootlayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import SignIn from "../pages/Auth/SignIn";
import AllFood from "../pages/fridge/AllFood";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/signin',
        Component: SignIn
      },{
        path:'/fridge',
        Component:AllFood
      }
    ]
  },
]);