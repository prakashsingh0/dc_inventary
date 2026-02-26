import { useEffect, useState } from "react";
import api from "../api/api";

const AddServerModal = ({ onSuccess }) => {
  const [dataCenters, setDataCenters] = useState([]);
  const [form, setForm] = useState({
    data_center: "",
    location: "",
    serial_no: "",
    make: "",
    model_no: "",
    type_no: "",
    host_name: "",
    ip_address: ""
  });

  useEffect(() => {
    fetchDataCenters();
  }, []);

  const fetchDataCenters = async () => {
    try {
      const res = await api.get("/data-centers");
      setDataCenters(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log(form);
      if (!form.data_center || !form.host_name || !form.ip_address) {
        console.log(form);
        
        alert("Data Center, Host Name and IP Address are required");
        return;
      }

      await api.post("/servers", form);
      onSuccess();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add server");
    }
  };

  return (
    <div className="card p-3 mb-3">
      <h5>Add Server</h5>

      {/* Data Center */}
      <select
        className="form-control mb-2"
        value={form.data_center}
        onChange={(e) =>
          setForm({ ...form, data_center: e.target.value })
        }
      >
        <option value="">Select Data Center</option>
        {dataCenters.map((dc) => (
          <option key={dc._id} value={dc._id}>
            {dc.name} ({dc.location})
          </option>
        ))}
      </select>

      {/* Rack Location */}
      <input
        className="form-control mb-2"
        placeholder="Rack Location"
        onChange={(e) =>
          setForm({ ...form, location: e.target.value })
        }
      />

      {/* Serial Number */}
      <input
        className="form-control mb-2"
        placeholder="Serial Number"
        onChange={(e) =>
          setForm({ ...form, serial_no: e.target.value })
        }
      />

      {/* Make */}
      <input
        className="form-control mb-2"
        placeholder="Make (Dell, HP, etc.)"
        onChange={(e) =>
          setForm({ ...form, make: e.target.value })
        }
      />

      {/* Model Number */}
      <input
        className="form-control mb-2"
        placeholder="Model Number"
        onChange={(e) =>
          setForm({ ...form, model_no: e.target.value })
        }
      />

      {/* Type Number */}
      <input
        className="form-control mb-2"
        placeholder="Type Number"
        onChange={(e) =>
          setForm({ ...form, type_no: e.target.value })
        }
      />

      {/* Host Name */}
      <input
        className="form-control mb-2"
        placeholder="Host Name"
        onChange={(e) =>
          setForm({ ...form, host_name: e.target.value })
        }
      />

      {/* IP Address */}
      <input
        className="form-control mb-2"
        placeholder="IP Address"
        onChange={(e) =>
          setForm({ ...form, ip_address: e.target.value })
        }
      />

      <button className="btn btn-primary w-100" onClick={handleSubmit}>
        Add Server
      </button>
    </div>
  );
};

export default AddServerModal;