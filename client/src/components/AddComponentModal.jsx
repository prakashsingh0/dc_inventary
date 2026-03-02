import { useEffect, useState } from "react";
import api from "../api/api";

const AddComponentModal = ({ serverId, onSuccess }) => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState("");
  const [slot, setSlot] = useState("");

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await api.get("/stocks");

      // Only Available
      const availableStocks = res.data.data.filter(
        (stock) => stock.status === "Available"
      );

      setStocks(availableStocks);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInstall = async () => {
    try {
      if (!selectedStock || !slot) {
        alert("Please select stock and enter slot");
        return;
      }

      await api.post("/component/install-from-stock", {  //  fixed route
        server_id: serverId,
        stock_id: selectedStock,
        slot
      });

      onSuccess();
    } catch (error) {
      alert(error.response?.data?.message || "Install failed");
    }
  };

  return (
    <div className="card p-3 mb-3">
      <h5>Install Component From Stock</h5>

      <select
        className="form-control mb-2"
        value={selectedStock}
        onChange={(e) => setSelectedStock(e.target.value)}
      >
        <option value="">Select Available Stock</option>
        {stocks.map((s) => (
          <option key={s._id} value={s._id}>   {/*  Mongo _id */}
            {s.component_type} | {s.model_no} | {s.serial_no}
          </option>
        ))}
      </select>

      <input
        className="form-control mb-2"
        placeholder="Slot (e.g. DIMM_A1)"
        value={slot}
        onChange={(e) => setSlot(e.target.value)}
      />

      <button className="btn btn-success w-100" onClick={handleInstall}>
        Install Component
      </button>
    </div>
  );
};

export default AddComponentModal;
