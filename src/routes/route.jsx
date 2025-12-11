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
import PrivateRoute from "../Private/PrivateRoute";


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
        element: <PrivateRoute>
         <LoanDetails/>
         </PrivateRoute>
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
        element: <PrivateRoute>
        <BarChartStatus/>
        </PrivateRoute> 
      },
      {
        path: "my-loans",
        element: <PrivateRoute>
          <MyLoan></MyLoan>
        </PrivateRoute>
      },
      {
        path: "pending-loans",
        element: 
        // <PrivateRoute>
          <PendingLoans></PendingLoans>
        // </PrivateRoute>
      },
       {
        path: 'payment-success',
        element: <PrivateRoute>
          <PaymentSuccess />
        </PrivateRoute>,
      },
       {
        path: "again/:id",
        element: <PrivateRoute>
           <CancelPay></CancelPay>
        </PrivateRoute>
      },
       {
        path: "manage-users",
        element: <PrivateRoute>
          <ManageUsers></ManageUsers>
        </PrivateRoute>
      },
       {
        path: "updateUser",
        element: <PrivateRoute>
          <Updateuser></Updateuser>
        </PrivateRoute>
      },
       {
        path: "all-loan",
        element: <PrivateRoute>
          <AllLoan></AllLoan>
        </PrivateRoute>
      },
       {
        path: "update-loan/:id",
        element: <PrivateRoute>
          <UpdateLoanForm></UpdateLoanForm>
        </PrivateRoute>
      },
       {
        path: "loan-applications",
        element: <PrivateRoute>
          <LoanApllication></LoanApllication>
        </PrivateRoute>
      },
       {
        path: "add-loan",
        element: <PrivateRoute>
          <AddLoan></AddLoan>
        </PrivateRoute>
      },
       {
        path: "manage-loans",
        element: <PrivateRoute>
           <ManageLoan></ManageLoan>
        </PrivateRoute>
      },
       {
        path: "approved-loans",
        element:
        //  <PrivateRoute>
          <ApprovedLoan></ApprovedLoan>
        // </PrivateRoute>
      },
       {
        path: "profile",
        element: <PrivateRoute>
          <ProfileManager></ProfileManager>
        </PrivateRoute>
      },
    ]
  },{
    path: "*",
    element: <ErrorPage></ErrorPage>
  }
]);