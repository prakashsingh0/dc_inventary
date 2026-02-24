import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import api from "./api/api";

import Navbar from "./components/Navbar";
import Servers from "./pages/Servers";
import Stocks from "./pages/Stocks";
import ReplacementHistory from "./pages/ReplacementHistory";
import Components from "./pages/Components";
import DataCenterList from "./pages/DataCenterList";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/profile");
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar onSearch={setSearchValue} />}

      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Login />
          }
        />

        {/* <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/" /> : <Register />
          }
        /> */}

        <Route
          path="/"
          element={
            isAuthenticated ? <DataCenterList /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/servers/:dataCenterId"
          element={
            isAuthenticated ? (
              <Servers searchValue={searchValue} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/components/:id"
          element={
            isAuthenticated ? <Components /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/stocks"
          element={
            isAuthenticated ? <Stocks /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/replacements"
          element={
            isAuthenticated ? (
              <ReplacementHistory />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;