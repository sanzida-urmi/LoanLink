import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import ErrorPage from "../Pages/ErrorPage";
import Mainlayout from "../Layout/Mainlayout";
import { Component } from "react";
import DashboardLayout from "../Layout/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      }
    ]
  },
  {
    path: "/signup",
    Component: SignUp
  },
  {
    path: "/login",
    Component: Login
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
     children: [
      {
        index: true,
        element: <Home></Home>
      }
    ]
  }
]);