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

  //  Filter by status first
  const filteredStocks = stocks.filter(
    (stock) => stock.status === filter
  );

  //  Divide into RAM & HDD
  const ramStocks = filteredStocks.filter(
    (stock) => stock.component_type === "RAM"
  );

  const hddStocks = filteredStocks.filter(
    (stock) => stock.component_type === "HDD"
  );

  const renderTable = (data,type) => (
    <table className="table table-bordered table-striped mt-3">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Model</th>
          <th>{type === 'HDD'? 'Part no.':'DDR'}</th>
          <th>Capacity</th>
          <th>Speed</th>
          <th>Serial No</th>
          <th>Status</th>
          <th>Added On</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((stock) => (
            <tr key={stock._id}>
              <td>{stock._id}</td>
              <td>{stock.model_no}</td>
              <td>{stock.ddr_type || stock.part_no}</td>
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
                {new Date(stock.createdAt).toLocaleString()}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center">
              No stocks found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Stocks</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddStock(!showAddStock)}
        >
          {showAddStock ? "Close" : "Add Stock"}
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

      {/* Status Filter */}
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

      {/*  RAM Section */}
      <h4 className="mt-4">RAM</h4>
      {renderTable(ramStocks,'RAM')}

      {/*  HDD Section */}
      <h4 className="mt-5">HDD</h4>
      {renderTable(hddStocks,'HDD')}
    </div>
  );
};

export default Stocks;