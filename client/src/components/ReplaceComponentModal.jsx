import { useEffect, useState } from "react";
import api from "../api/api";

const ReplaceComponentModal = ({ serverId, oldComponentId, onSuccess }) => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");

  useEffect(() => {
    fetchAvailableStocks();
  }, []);

  const fetchAvailableStocks = async () => {
    try {
      const res = await api.get("/stocks");
      const available = res.data.data.filter(
        (stock) => stock.status === "Available"
      );
      setStocks(available);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReplace = async () => {
    try {
      if (!selectedStock) {
        alert("Please select stock");
        return;
      }

      await api.post("/replacements/replace", {   // ✅ Correct route
        server_id: serverId,
        old_component_id: oldComponentId,
        stock_id: selectedStock,
        slot: "AUTO"
      });

      onSuccess();
    } catch (error) {
      alert(error.response?.data?.message || "Replace failed");
    }
  };

  return (
    <div className="card p-3 mt-3">
      <h6>Replace Component</h6>

      <select
        className="form-control mb-2"
        value={selectedStock}
        onChange={(e) => setSelectedStock(e.target.value)}
      >
        <option value="">Select Stock</option>
        {stocks.map((s) => (
          <option key={s._id} value={s._id}>  {/* ✅ Mongo _id */}
            {s.component_type} - {s.serial_no}
          </option>
        ))}
      </select>

      <button className="btn btn-danger" onClick={handleReplace}>
        Replace
      </button>
    </div>
  );
};

export default ReplaceComponentModal;
