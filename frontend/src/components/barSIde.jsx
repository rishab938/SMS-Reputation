import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        borderRight: "1px solid gray",
        padding: "20px",
      }}
    >
      <h3>SMS System</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/new">New Sender</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;