import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import AddServerModal from "../components/AddServerModal";

const Servers = ({ searchValue }) => {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/servers/location/Mumbai");
      setServers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch servers", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredServers = servers.filter((server) =>
    server.host_name
      ?.toLowerCase()
      .includes((searchValue || "").toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Servers</h2>

        <button
          className="btn btn-success"
          onClick={() => setShowAdd(!showAdd)}
        >
          Add Server
        </button>
      </div>

      {showAdd && (
        <AddServerModal
          onSuccess={() => {
            setShowAdd(false);
            fetchServers();
          }}
        />
      )}

      {loading ? (
        <p>Loading servers...</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Host Name</th>
              <th>IP</th>
              <th>Rack</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredServers.length > 0 ? (
              filteredServers.map((s) => (
                <tr key={s._id}> 
                  <td
                    className="text-primary fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/servers/${s._id}`)} 
                  >
                    {s.host_name}
                  </td>
                  <td>{s.ip_address}</td>
                  <td>{s.location}</td> 
                  <td>
                    {s.amber_light ? (
                      <span className="badge bg-warning text-dark">
                        Amber
                      </span>
                    ) : (
                      <span className="badge bg-success">
                        Healthy
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No servers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Servers;
