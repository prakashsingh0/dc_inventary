import React, { useState } from "react";
import api from "../api/api"

const AddDataCenter = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/data-centers/", {
        name,
        location,
      });

      alert("Data Center Added Successfully");
      setName("");
      setLocation("");
    } catch (error) {
      console.error(error);
      alert("Error adding data center");
    }
  };

  return (
    <div>
      <h2>Add Data Center</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Data Center Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddDataCenter;
