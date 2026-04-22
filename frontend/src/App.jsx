import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import NewSender from "./pages/NewSender";
import SenderDetails from "./pages/SenderDetails";

import Layout from "./components/Layout";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/leaderboard" 
          element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} 
        />
        <Route 
          path="/new" 
          element={<ProtectedRoute><NewSender /></ProtectedRoute>} 
        />
        <Route 
          path="/sender/:id" 
          element={<ProtectedRoute><SenderDetails /></ProtectedRoute>} 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;