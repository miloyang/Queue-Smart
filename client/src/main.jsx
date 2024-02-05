import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import AddVenue from "./pages/AddVenue.jsx";
import JoinQueueSuccess from "./pages/JoinQueueSuccess.jsx";
import Queue from "./pages/Queue";
import JoinQueueForm from "./components/JoinQueueForm";
import LiveQueue from "./components/LiveQueue";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/add-venue",
        element: <AddVenue />,
      },
      {
        path: "/join-queue-success",
        element: <JoinQueueSuccess />,
      },
      {
        path: '/venue/:venueId',
        element: <Queue />
      },
      {
        path: '/venue/:venueId/join-queue',
        element: <JoinQueueForm />
      },
      {
        path: '/venue/:venueId/live-queue',
        element: <LiveQueue />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
