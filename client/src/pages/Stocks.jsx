import { useEffect, useState } from "react";
import api from "../api/api";
import AddStockModal from "../components/AddStockModal";

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [filter, setFilter] = useState("Available");
  const [showAddStock, setShowAddStock] = useState(false);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await api.get(`/stocks`);
      setStocks(res.data.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const filteredStocks = stocks
    .filter(
      (stock) =>
        stock.status === "Available" ||
        stock.status === "Installed"
    )
    .filter((stock) => stock.status === filter);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Stocks</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddStock(!showAddStock)}
        >
          Add Stock
        </button>
      </div>

      {showAddStock && (
        <AddStockModal
          onSuccess={() => {
            setShowAddStock(false);
            fetchStocks();
          }}
        />
      )}

      <div className="mb-3">
        <button
          className={`btn me-2 ${
            filter === "Available"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => setFilter("Available")}
        >
          Available
        </button>

        <button
          className={`btn ${
            filter === "Installed"
              ? "btn-success"
              : "btn-outline-success"
          }`}
          onClick={() => setFilter("Installed")}
        >
          Installed
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Model</th>
            <th>DDR</th>
            <th>Capacity</th>
            <th>Speed</th>
            <th>Serial No</th>
            <th>Status</th>
            <th>Added On</th>
          </tr>
        </thead>
        <tbody>
          {filteredStocks.length > 0 ? (
            filteredStocks.map((stock) => (
              <tr key={stock._id}> {/* ✅ Mongo _id */}
                <td>{stock._id}</td>
                <td>{stock.component_type}</td>
                <td>{stock.model_no}</td>
                <td>{stock.ddr_type || "-"}</td>
                <td>
                  {stock.capacity_value} {stock.capacity_unit}
                </td>
                <td>{stock.speed || "-"}</td>
                <td>{stock.serial_no}</td>
                <td>
                  {stock.status === "Available" ? (
                    <span className="badge bg-primary">
                      Available
                    </span>
                  ) : (
                    <span className="badge bg-success">
                      Installed
                    </span>
                  )}
                </td>
                <td>
                  {new Date(stock.createdAt).toLocaleString()} {/* ✅ */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No stocks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Stocks;
