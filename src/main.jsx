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
import Dashboard from './Pages/Dashboard/Dashboard';
import AuthProvider from './Provider/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './Private/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import AllEmployee from './Pages/Dashboard/AllEmployee';
import Payroll from './Pages/Payroll';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
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
    element:<PrivateRoute><Dashboard/></PrivateRoute>,
    children:([
      {
        path:'allusers',
        element:<AllEmployee/>
      },
      {
        path:'payroll',
        element:<Payroll/>
      },
    ])
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
    <QueryClientProvider client={queryClient}>
    <ToastContainer/>
    <HelmetProvider>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
</HelmetProvider>

    </QueryClientProvider>

</StrictMode>,
)
