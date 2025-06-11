import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layout/Rootlayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import SignIn from "../pages/Auth/SignIn";
import AllFood from "../pages/fridge/AllFood";
import AddFood from "../pages/addfood/AddFood";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
   hydrateFallbackElement: <div className='min-h-screen max-w-screen mx-auto flex justify-center'>
                    <span className="loading loading-spinner text-success"></span>
                </div>,
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
      },{
        path:'/addfood',
        Component:AddFood
      }
    ]
  },
]);