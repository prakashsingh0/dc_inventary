import { useEffect, useState } from "react";
import api from "../api/api";

const ReplacementHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/replacements");
      setHistory(res.data.data);
    } catch (error) {
      console.error("Error fetching replacement history:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Replacement History</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Server</th>
            <th>Old Component</th>
            <th>New Component</th>
            <th>Replaced On</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((item) => (
              <tr key={item._id}> {/* ✅ Mongo _id */}
                <td>{item._id}</td>

                <td>{item.server?.host_name}</td>

                <td>
                  <strong>{item.old_component?.component_type}</strong><br />
                  {item.old_component?.serial_no}
                </td>

                <td>
                  <strong>{item.new_component?.component_type}</strong><br />
                  {item.new_component?.serial_no}
                </td>

                <td>
                  {new Date(item.createdAt).toLocaleString()}
                </td>

                <td>{item.reason}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No replacement history found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReplacementHistory;
