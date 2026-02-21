import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between">
      <div>
        {/* 🔥 Logo → Data Centers Homepage */}
        <Link className="navbar-brand me-3" to="/">
          DC Inventory
        </Link>

        {/* ✅ Data Centers */}
        <Link className="btn btn-outline-light me-2" to="/">
          Data Centers
        </Link>

        {/* ⚠ Servers link removed because it needs dataCenterId */}

        <Link className="btn btn-outline-light me-2" to="/stocks">
          Stocks
        </Link>

        <Link className="btn btn-outline-light" to="/replacements">
          Replacement History
        </Link>
      </div>

      {/* 🔍 Show Search ONLY on Servers page */}
      {location.pathname.includes("/servers") && (
        <div className="d-flex">
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
    </nav>
  );
};

export default Navbar;
