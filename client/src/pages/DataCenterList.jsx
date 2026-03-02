import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import AddDataCenter from "../components/AddDataCenter"; //  IMPORT

const DataCenterList = () => {
  const [dataCenters, setDataCenters] = useState([]);
  const [showAdd, setShowAdd] = useState(false); //  Toggle state
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataCenters();
  }, []);

  const fetchDataCenters = async () => {
    try {
      const res = await api.get("/data-centers/");
      setDataCenters(res.data.data);
    } catch (err) {
      console.error("Failed to fetch data centers", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Data Centers</h2>

        {/*  Add Button */}
        <button
          className="btn btn-success"
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? "Close" : "Add Data Center"}
        </button>
      </div>

      {/*  Show AddDataCenter Component */}
      {showAdd && (
        <AddDataCenter
          onSuccess={() => {
            setShowAdd(false);
            fetchDataCenters(); // refresh list
          }}
        />
      )}

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {dataCenters.length > 0 ? (
            dataCenters.map((dc) => (
              <tr
                key={dc._id}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/servers/${dc._id}`)}
              >
                <td>{dc.name}</td>
                <td>{dc.location}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                No Data Centers Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataCenterList;
