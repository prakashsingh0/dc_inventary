import { useState } from "react";
import api from "../api/api";

const AddStockModal = ({ onSuccess }) => {
  const [form, setForm] = useState({
    component_type: "",
    model_no: "",
    part_no: "",
    asset_tag_no: "",
    ticket_no: "",
    ddr_type: "",
    capacity_value: "",
    capacity_unit: "GB",
    speed: "",
    serial_no: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      // 🔹 Basic validation
      if (
        !form.component_type ||
        !form.model_no ||
        !form.capacity_value ||
        !form.capacity_unit ||
        !form.serial_no
      ) {
        alert("Please fill all required fields");
        return;
      }

      // 🔹 RAM specific validation
      if (form.component_type === "RAM" && !form.ddr_type) {
        alert("DDR type is required for RAM");
        return;
      }

      setLoading(true);

      await api.post("/stocks/add", {
        ...form,
        capacity_value: Number(form.capacity_value)
      });

      onSuccess();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 mt-3 shadow-sm">
      <h5 className="mb-3">Add Stock</h5>

      {/* Component Type */}
      <select
        className="form-control mb-2"
        value={form.component_type}
        onChange={(e) =>
          setForm({ ...form, component_type: e.target.value, ddr_type: "" })
        }
      >
        <option value="">Select Type</option>
        <option value="RAM">RAM</option>
        <option value="HDD">HDD</option>
      </select>

      <input
        className="form-control mb-2"
        placeholder="Model Number *"
        value={form.model_no}
        onChange={(e) =>
          setForm({ ...form, model_no: e.target.value })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Part Number"
        value={form.part_no}
        onChange={(e) =>
          setForm({ ...form, part_no: e.target.value })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Asset Tag Number"
        value={form.asset_tag_no}
        onChange={(e) =>
          setForm({ ...form, asset_tag_no: e.target.value })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Ticket Number"
        value={form.ticket_no}
        onChange={(e) =>
          setForm({ ...form, ticket_no: e.target.value })
        }
      />

      {/* RAM Only */}
      {form.component_type === "RAM" && (
        <select
          className="form-control mb-2"
          value={form.ddr_type}
          onChange={(e) =>
            setForm({ ...form, ddr_type: e.target.value })
          }
        >
          <option value="">Select DDR *</option>
          <option value="DDR3">DDR3</option>
          <option value="DDR4">DDR4</option>
          <option value="DDR5">DDR5</option>
        </select>
      )}

      <input
        type="number"
        className="form-control mb-2"
        placeholder="Capacity *"
        value={form.capacity_value}
        onChange={(e) =>
          setForm({ ...form, capacity_value: e.target.value })
        }
      />

      <select
        className="form-control mb-2"
        value={form.capacity_unit}
        onChange={(e) =>
          setForm({ ...form, capacity_unit: e.target.value })
        }
      >
        <option value="GB">GB</option>
        <option value="TB">TB</option>
      </select>

      <input
        className="form-control mb-2"
        placeholder="Speed"
        value={form.speed}
        onChange={(e) =>
          setForm({ ...form, speed: e.target.value })
        }
      />

      <input
        className="form-control mb-3"
        placeholder="Serial Number *"
        value={form.serial_no}
        onChange={(e) =>
          setForm({ ...form, serial_no: e.target.value })
        }
      />

      <button
        className="btn btn-primary w-100"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Stock"}
      </button>
    </div>
  );
};

export default AddStockModal;