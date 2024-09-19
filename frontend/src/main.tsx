import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import CallbackPage from "./pages/CallbackPage.tsx";

import "./index.css";
import LandingPage from "./pages/LandingPage.tsx";
import Layout from "./layout/Layout.tsx";
import PlayLotteryPage from "./pages/PlayLotteryPage.tsx";
import OnrampPage from "./pages/OnrampPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Outlet /></Layout>,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/play-lottery",
        element: <PlayLotteryPage />,
      },
      {
        path: "/callback",
        element: <CallbackPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/onramp",
        element: <OnrampPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
