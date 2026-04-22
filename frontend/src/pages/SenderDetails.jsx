import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function SenderDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/api/sender/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Sender Details</h2>

      <p><b>Sender ID:</b> {id}</p>
      <p><b>Score:</b> {data.score}</p>
      <p><b>Status:</b> {data.status}</p>

      <hr />

      <p><b>Spam Rate:</b> {data.spam_rate}</p>
      <p><b>Volume:</b> {data.volume}</p>
      <p><b>Link Density:</b> {data.link_density}</p>
      <p><b>Avg Length:</b> {data.avg_length}</p>
      <p><b>Source:</b> {data.source}</p>
    </div>
  );
}

export default SenderDetails;