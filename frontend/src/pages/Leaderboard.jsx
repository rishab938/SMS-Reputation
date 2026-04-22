import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Leaderboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/api/leaderboard")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
      });
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>

      {data.length === 0 ? (
        <p>No Data</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Sender ID</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((sender, index) => (
              <tr key={sender.sender_id || index}>
                <td>{sender.rank || index + 1}</td>

                {/* 🔥 CLICKABLE SENDER */}
                <td
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => navigate(`/sender/${sender.sender_id}`)}
                >
                  {sender.sender_id}
                </td>

                <td>{sender.score}</td>
                <td>{sender.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leaderboard;