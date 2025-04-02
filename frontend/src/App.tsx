import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import Signup from "./pages/Signup";
import { LoginProvider } from "./providers/LoginProvider";
import {
  ProtectedDashboardRoute,
  ProtectedLoginSignupRoute,
} from "./components/ProtectedRoute";

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  return (
    <>
      <LoginProvider>
        <Navbar />
        <Routes>
          <Route element={<ProtectedDashboardRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route element={<ProtectedLoginSignupRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedLoginSignupRoute />}>
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </LoginProvider>
      <Toaster />
    </>
  );
};

export default App;
