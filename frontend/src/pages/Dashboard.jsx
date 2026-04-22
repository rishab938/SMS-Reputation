import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/api/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <h4>Total Senders</h4>
          <p>{data.total_senders}</p>
        </div>

        <div>
          <h4>Average Score</h4>
          <p>{data.average_score}</p>
        </div>

        <div>
          <h4>Alerts</h4>
          <p>{data.alerts}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;