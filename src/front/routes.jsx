import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Navigate,
    Outlet
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Private } from "./pages/Private";
import { useAuth } from "./hooks/useAuth";


const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
     
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/single/:theId" element={<Single />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

       
        <Route element={<PrivateRoute />}>
          <Route path="/private" element={<Private />} />
        </Route>
      </Route>
    )
);