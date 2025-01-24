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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminRoute from './Private/AdminRoute';
import Payroll from './Pages/Dashboard/Payroll';
import EmployeeList from './Pages/Dashboard/EmployeeList';
import PaymentHistory from './Pages/Dashboard/PaymentHistory';
import Worksheet from './Pages/Dashboard/Worksheet';
import Details from './Pages/Dashboard/Details';
import Progress from './Pages/Dashboard/Progress';
import Payment from './Components/Payment';

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
        element:<AdminRoute><AllEmployee/></AdminRoute>
      },
      {
        path:'payroll',
        element:<AdminRoute><Payroll/></AdminRoute>
      },
      {
        path:'payment/:id',
        element:<AdminRoute><Payment/></AdminRoute>
      },
      {
        path:'employee-list',
        element:<PrivateRoute><EmployeeList/></PrivateRoute>
      },
      {
        path:'paymenthistory',
        element:<PrivateRoute><PaymentHistory/></PrivateRoute>,
      },
      {
        path:'worksheet',
        element:<PrivateRoute><Worksheet/></PrivateRoute>,
      },
      {
        path:'details/:id',
        element:<Details/>,
      },
      {
        path:'progress',
        element:<PrivateRoute><Progress/></PrivateRoute>
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
