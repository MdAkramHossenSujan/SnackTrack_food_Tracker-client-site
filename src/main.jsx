import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from './route/Routes.jsx'
import {
  RouterProvider,
} from "react-router";
import AuthProvider from './context/AuthContext/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position='top-center'></Toaster>
    </AuthProvider>
  </StrictMode>,
)
