import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", form);

      alert(res.data.message);
      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-3 text-center">Register</h2>

      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <input
          className="form-control mb-2"
          placeholder="First Name"
          required
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
        />

        {/* Last Name */}
        <input
          className="form-control mb-2"
          placeholder="Last Name"
          required
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
        />

        {/* Email */}
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* Password with toggle */}
        <div className="input-group mb-3">
          <input
            className="form-control"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Register Button */}
        <button className="btn btn-primary w-100">
          Register
        </button>
      </form>

      <p className="mt-3 text-center">
        Already have an account?{" "}
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;