import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import NewSender from "./pages/NewSender";
import SenderDetails from "./pages/SenderDetails";

import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={
          <Layout><Dashboard /></Layout>
        } />

        <Route path="/leaderboard" element={
          <Layout><Leaderboard /></Layout>
        } />

        <Route path="/new" element={
          <Layout><NewSender /></Layout>
        } />

        <Route path="/sender/:id" element={
          <Layout><SenderDetails /></Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;