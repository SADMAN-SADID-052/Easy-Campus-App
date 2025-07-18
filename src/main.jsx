import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Main from "./Layouts/Main";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AuthProvider from "./Provider/AuthProvider";
import AuthLayout from "./Layouts/AuthLayout";
import PrivateRoute from "./Routes/PrivateRoute";
import College from "./Pages/College";
import CollegeDetails from "./Pages/CollegeDetails";
import Admission from "./Pages/Admission";
import MyCollege from "./Pages/MyCollege";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main></Main>} />
          <Route path="/colleges" element={
            
            <PrivateRoute>

               <College></College>
            </PrivateRoute>
           
            
            
            } />
          <Route path="/addmis" element={
            <PrivateRoute>
               <Admission></Admission>
            </PrivateRoute>
            } />
          <Route path="myCol" element={
            
            <PrivateRoute><MyCollege></MyCollege></PrivateRoute>
           } />

           <Route path="/colleges/:id" element={<CollegeDetails />} />

          <Route path="auth" element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register></Register>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
