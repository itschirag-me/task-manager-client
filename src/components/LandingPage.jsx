import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "./Auth/Login";
import RequireAuth from "./Auth/RequireAuth";
import SignUp from "./Auth/SignUp";
import UnrequiredAuth from "./Auth/UnrequiredAuth";
import Layout from "./Layout/Layout";
import Dashboard from "./Page/Dashboard/Dashboard";
import NotFoundPage from "./Page/NotFoundPage";
import Profile from "./Page/Profile/Profile";
import ProfileEdit from "./Page/Profile/ProfileEdit";
import ProfilePreview from "./Page/Profile/ProfilePreview";
import SettingList from "./Page/Settings/SettingList";
import Tasks from "./Page/Tasks/Tasks";
import Users from './Page/Users/Users';
import AddTasks from './Page/Tasks/components/AddTasks';
import TasksList from "./Page/Tasks/components/TasksList";

const LandingPage = () => {
  const routeConfig = [
    {
      path: "",
      element: <RequireAuth />,
      children: [
        {
          path: "",
          element: <Layout />,
          children: [
            {
              path: "",
              element: <Dashboard />,
            },
            {
              path: "tasks",
              element: <Tasks />,
              children: [
                {
                  path: "",
                  element: <TasksList />,
                },
                {
                  path: "add-task",
                  element: <AddTasks />,
                },
              ],
            },
            {
              path: "/users",
              element: <Users />,
            },
            {
              path: "/settings",
              element: <SettingList />,
            },
            {
              path: "/profile",
              element: <Profile />,
              children: [
                {
                  path: "",
                  element: <ProfilePreview />,
                },
                {
                  path: "edit",
                  element: <ProfileEdit />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "",
      element: <UnrequiredAuth />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];

  const element = useRoutes(routeConfig);

  return <>{element}</>;
};

export default LandingPage;
