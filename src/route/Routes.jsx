import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layout/Rootlayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import SignIn from "../pages/Auth/SignIn";
import AllFood from "../pages/fridge/AllFood";
import AddFood from "../pages/addfood/AddFood";
import FoodDetails from "../pages/details/FoodDetails";
import MyFood from "../pages/MyFood/MyFood";
import PrivateRoute from "../context/AuthContext/PrivateRoute";
import UpdateFood from "../pages/updateFood/UpdateFood";
import ErrorPage from "../pages/error/ErrorPage";
import About from "../pages/about/About";
import DashBoard from "../Layout/DashBoard";
import DashboardHome from "../pages/dashboard/DashboardHome";
import MyAddedFood from "../pages/dashboard/MyAddedFood";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <div className='min-h-screen max-w-screen mx-auto flex justify-center'>
      <span className="loading loading-spinner text-success"></span>
    </div>,
    errorElement: <ErrorPage></ErrorPage>,
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
      }, {
        path: '/fridge',
        Component: AllFood
      }, {
        path: '/addfood',
        element: <PrivateRoute>
          <AddFood></AddFood>
        </PrivateRoute>,
        hydrateFallbackElement: <div className='min-h-screen max-w-screen mx-auto flex justify-center'>
          <span className="loading loading-spinner text-success"></span>
        </div>,
      },
      {
        path: '/fridgeFoods/:id',
        Component: FoodDetails,
        loader: ({ params }) => fetch(`https://food-expiry-tracker-server.vercel.app/fridgeFoods/${params.id}`),
        hydrateFallbackElement: <div className='min-h-screen max-w-screen mx-auto flex justify-center'>
          <span className="loading loading-spinner text-success"></span>
        </div>,
      }, {
        path: '/myfooditems',
        element: <PrivateRoute>
          <MyFood></MyFood>
        </PrivateRoute>,
        hydrateFallbackElement: <div className='min-h-screen max-w-screen mx-auto flex justify-center'>
          <span className="loading loading-spinner text-success"></span>
        </div>,
      },
      {
        path: '/updateFood/:id',
        element: <PrivateRoute>
          <UpdateFood></UpdateFood>
        </PrivateRoute>,
        loader: ({ params }) => fetch(`https://food-expiry-tracker-server.vercel.app/fridgeFoods/${params.id}`),
        hydrateFallbackElement: <div className='min-h-screen max-w-screen mx-auto flex justify-center'>
          <span className="loading loading-spinner text-success"></span>
        </div>,
      },
      {
        path: '/about',
        Component: About
      }
    ]
  },
  {
    path: '/dashboard',
    Component: DashBoard,
    hydrateFallbackElement: <div className='min-h-screen max-w-screen mx-auto flex justify-center'>
      <span className="loading loading-spinner text-success"></span>
    </div>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        path: '/dashboard',
        Component: DashboardHome
      },
      {
        path:'/dashboard/myaddedfoods',
        Component:MyAddedFood
      },
      {
        path:'/dashboard/expired',
        Component:MyAddedFood
      },
      {
        path:'/dashboard/notexpired',
        Component:MyAddedFood
      },
      {
        path:'/dashboard/profile',
        Component:MyAddedFood
      }
    ]
  }
]);