import { useState } from "react";
import API from "../services/api";

function NewSender() {
  const [message, setMessage] = useState("");
  const [senderId, setSenderId] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    API.post("/api/predict", {
      message,
      sender_id: senderId,
    })
      .then((res) => setResult(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>New Sender Analysis</h2>

      <input
        placeholder="Sender ID"
        value={senderId}
        onChange={(e) => setSenderId(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Analyze</button>

      {result && (
        <div>
          <h3>Result</h3>
          <p>Prediction: {result.prediction}</p>
          <p>Score: {result.score}</p>
          <p>Status: {result.status}</p>
        </div>
      )}
    </div>
  );
}

export default NewSender;