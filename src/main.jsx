import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Main from "./Layouts/Main";
import Events from "./Pages/Events";
import AddEvent from "./Pages/AddEvent";
import MyEvent from "./Pages/MyEvent";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AuthProvider from "./Provider/AuthProvider";
import AuthLayout from "./Layouts/AuthLayout";
import PrivateRoute from "./Routes/PrivateRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main></Main>} />
          <Route path="/events" element={
            
            <PrivateRoute>

               <Events></Events>
            </PrivateRoute>
           
            
            
            } />
          <Route path="/addEvent" element={
            <PrivateRoute>
              <AddEvent></AddEvent>
            </PrivateRoute>
            } />
          <Route path="myEvent" element={
            
            <PrivateRoute> <MyEvent></MyEvent></PrivateRoute>
           } />

          <Route path="auth" element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register></Register>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
