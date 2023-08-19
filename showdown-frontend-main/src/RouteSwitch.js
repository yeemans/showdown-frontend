import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Header";
import Builder from "./Components/Builder";

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/builder" exact element={<Builder />} />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;