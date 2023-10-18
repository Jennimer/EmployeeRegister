import React from 'react'
import ReactDOM from 'react-dom/client'
import
{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from "./routes/Home/home";
import Employees from "./routes/Employee/employees";
import OneEmployee from "./routes/Employee/oneEmployee";
import CreateEmployee from "./routes/Employee/createEmployee";
import EditEmployee from "./routes/Employee/editEmployee";



const router = createBrowserRouter([

  {
    path: "/",
    element: <Home />,

  },

  {
    path: "/employees",
    element: <Employees />,

  },
  {
    path: "/createEmployee",
    element: <CreateEmployee />,
  },
  {
    path: "/editEmployee/:id",
    element: <EditEmployee />,
  },
  {
    path: "/employeeDetails/:id",
    element: <OneEmployee />,
  },



]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider router={router} />
  </React.StrictMode>
);
