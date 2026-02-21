import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import AddComponentModal from "../components/AddComponentModal";

const Components = () => {
  const { id } = useParams();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/servers/${id}/components`);
      setComponents(res.data.data);
    } catch (err) {
      console.error("Failed to fetch components", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Server Components</h2>

        <button
          className="btn btn-success"
          onClick={() => setShowAdd(!showAdd)}
        >
          Add Component
        </button>
      </div>

      {showAdd && (
        <AddComponentModal
          serverId={id}
          onSuccess={() => {
            setShowAdd(false);
            fetchComponents();
          }}
        />
      )}

      {loading ? (
        <p>Loading components...</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Type</th>
              <th>Slot</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Health</th>
            </tr>
          </thead>
          <tbody>
            {components.length > 0 ? (
              components.map((c) => (
                <tr key={c._id}> {/* ✅ Mongo uses _id */}
                  <td>{c.component_type}</td>
                  <td>{c.slot}</td>
                  <td>
                    {c.capacity_value} {c.capacity_unit}
                  </td>
                  <td>{c.status}</td>
                  <td>{c.health_status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No components installed
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Components;
