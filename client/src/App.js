import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Servers from "./pages/Servers";
import Stocks from "./pages/Stocks";
import ReplacementHistory from "./pages/ReplacementHistory";
import Components from "./pages/Components";
import DataCenterList from "./pages/DataCenterList";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <BrowserRouter>
      <Navbar onSearch={setSearchValue} />

      <Routes>
        {/* Homepage = Data Centers */}
        <Route path="/" element={<DataCenterList />} />

        {/*  Servers inside selected Data Center */}
        <Route
          path="/servers/:dataCenterId"
          element={<Servers searchValue={searchValue} />}
        />

        {/* Existing */}
        <Route path="/components/:id" element={<Components />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/replacements" element={<ReplacementHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
