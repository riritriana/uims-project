import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomepageAdmin from "./admin/HomepageAdmin.jsx";
import Students from "./admin/Students.jsx";
import Lecturers from "./admin/Lecturers.jsx";
import Course from "./admin/Course.jsx";
import Departement from "./admin/Departement.jsx";
import Learning from "./admin/Learning.jsx";
import Login from "./login/Login.jsx";
import Register from "./login/Register.jsx";
const pages = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    children: [
      {
        path: "/",
        element: <HomepageAdmin />,
      },
      {
        path: "/student",
        element: <Students />,
      },
      {
        path: "/lecturer",
        element: <Lecturers />,
      },
      {
        path: "/departement",
        element: <Departement />,
      },
      {
        path: "/course",
        element: <Course />,
      },
      {
        path: "/learning",
        element: <Learning />,
      },
    ],
  },
];

const router = createBrowserRouter([
  {
    element: <App />,
    children: pages,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
