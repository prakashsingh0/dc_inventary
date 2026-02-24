import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login");
      window.location.reload(); // refresh auth state
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between">
      
      <div>
        <Link className="navbar-brand me-3" to="/">
          DC Inventory
        </Link>

        <Link className="btn btn-outline-light me-2" to="/">
          Data Centers
        </Link>

        <Link className="btn btn-outline-light me-2" to="/stocks">
          Stocks
        </Link>

        <Link className="btn btn-outline-light me-2" to="/replacements">
          Replacement History
        </Link>
      </div>

      <div className="d-flex align-items-center">

        {/* 🔍 Search ONLY on Servers page */}
        {location.pathname.includes("/servers") && (
          <div className="d-flex me-3">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search server..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />

            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        )}

        {/* 🚪 Logout Button */}
        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;