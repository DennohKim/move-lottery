import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage.tsx";

import "./index.css";
import LandingPage from "./pages/LandingPage.tsx";
import Layout from "./layout/Layout.tsx";
import PlayLotteryPage from "./pages/PlayLotteryPage.tsx";
import OnrampPage from "./pages/OnrampPage.tsx";
import { WalletProvider } from "./components/WalletProvider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { WrongNetworkAlert } from "./components/WrongNetworkAlert.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
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
    <WalletProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <WrongNetworkAlert />
        <Toaster />
      </QueryClientProvider>
    </WalletProvider>
  </React.StrictMode>
);
