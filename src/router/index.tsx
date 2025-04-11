import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Project from "../pages/project/Project";
import Proposal from "../pages/proposal/Proposal";
import Profile from "../pages/profile/Profile";
import PowerBI from "../pages/power-bi/PowerBI";
import Predictions from "../pages/predictions/Predictions";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/projects" />,
        },
        {
          path: "projects",
          element: <Home />,
        },
        {
          path: "project/:projectId",
          element: <Project />,
        },
        {
          path: "proposal/:userId",
          element: <Proposal />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/power-bi",
          element: <PowerBI />,
        },
        {
          path: "/predictions",
          element: <Predictions />,
        },
      ],
    },

    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "/auth",
          element: <Navigate to="/auth/login" />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // Resolución de rutas relativas en splats
      v7_fetcherPersist: true, // Cambios en el comportamiento de persistencia de fetchers
      v7_normalizeFormMethod: true, // Normalización de `formMethod` a mayúsculas
      v7_partialHydration: true, // Hidratación parcial del `RouterProvider`
      v7_skipActionErrorRevalidation: true, // Cambio en revalidación tras errores de acción 4xx/5xx
    },
  }
);

export default router;
