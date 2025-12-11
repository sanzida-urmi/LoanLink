import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import ErrorPage from "../Pages/ErrorPage";
import Mainlayout from "../Layout/Mainlayout";
import { Component } from "react";
import DashboardLayout from "../Layout/DashboardLayout";
import AllLoans from "../Pages/AllLoans";
import LoanDetails from "../Pages/LoanDetails";
import Applyform from "../Pages/Applyform";
import MyLoan from "../Pages/BorrowerPages/MyLoan";
import PaymentSuccess from "../Pages/BorrowerPages/PaymentSuccess";
import CancelPay from "../Pages/BorrowerPages/CancelPay";
import PendingLoans from "../Pages/ManagerDashboard/PendingLoans";
import ManageUsers from "../Pages/ManagerDashboard/ManageUsers";
import Updateuser from "../Pages/ManagerDashboard/Updateuser";
import AllLoan from "../Pages/AdminDashboard/AllLoan";
import UpdateLoanForm from "../Pages/AdminDashboard/UpdateLoanForm";
import LoanApllication from "../Pages/AdminDashboard/LoanApllication";
import AddLoan from "../Pages/ManagerDashboard/AddLoan";
import ManageLoan from "../Pages/ManagerDashboard/ManageLoan";
import ApprovedLoan from "../Pages/ManagerDashboard/ApprovedLoan";
import ProfileManager from "../Pages/ManagerDashboard/ProfileManager";
// import MyLoan from "../Pages/BorrowerPages/MyLoan";
// import LoanDetails from "../Component/LoanDetails";
import BarChartStatus from '../Pages/BarChartStatus';
import AboutPage from "../Pages/AboutPage";
import Contact from "../Pages/Contact";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/alllones",
        element: <AllLoans></AllLoans>
      },
      {
        path: "/loan/:id",
        element: <LoanDetails/>
      },
      {
        path: "/loan/:id/apply",
        element: <Applyform></Applyform>
      },
      {
        path: "/about",
        element: <AboutPage></AboutPage>
      },
      {
        path: "/contact",
        element: <Contact></Contact>
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
    errorElement: <ErrorPage></ErrorPage>,
     children: [
      {
        index: true,
        element: <BarChartStatus/>
      },
      {
        path: "my-loans",
        element: <MyLoan></MyLoan>
      },
      {
        path: "pending-loans",
        element: <PendingLoans></PendingLoans>
      },
       {
        path: 'payment-success',
        element: <PaymentSuccess />,
      },
       {
        path: "again/:id",
        element: <CancelPay></CancelPay>
      },
       {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>
      },
       {
        path: "updateUser",
        element: <Updateuser></Updateuser>
      },
       {
        path: "all-loan",
        element: <AllLoan></AllLoan>
      },
       {
        path: "update-loan/:id",
        element: <UpdateLoanForm></UpdateLoanForm>
      },
       {
        path: "loan-applications",
        element: <LoanApllication></LoanApllication>
      },
       {
        path: "add-loan",
        element: <AddLoan></AddLoan>
      },
       {
        path: "manage-loans",
        element: <ManageLoan></ManageLoan>
      },
       {
        path: "approved-loans",
        element: <ApprovedLoan></ApprovedLoan>
      },
       {
        path: "profile",
        element: <ProfileManager></ProfileManager>
      },
    ]
  },{
    path: "*",
    element: <ErrorPage></ErrorPage>
  }
]);