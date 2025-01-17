import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './Pages/ErrorPage';
import Home from './Pages/Home/Home';
import Contacts from './Pages/Contacts';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';

const router = createBrowserRouter([
  {
    path:'/',
    errorElement:<ErrorPage/>,
    element:<Home/>,
  },
  {
    path:'/contacts',
    element:<Contacts/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
