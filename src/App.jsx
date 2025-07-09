import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Profile from "./components/Profile";
import { dashboardContext } from "./context.js";
import { useEffect } from "react";
import Dashboard from "./components/Dashboard.jsx";

const App = () => {
  const { getUsersData, getComments } = dashboardContext();
  useEffect(() => {
    getUsersData();
    getComments();
  }, []);
  return (
    <div className="flex flex-col items-center w-full min-h-dvh bg-neutral-300">
      <Header />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default App;
