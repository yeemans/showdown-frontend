import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Header";
import Builder from "./Components/Builder";

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/showdown-frontend" exact element={<Home />} />
        <Route path="/showdown-frontend/builder" exact element={<Builder />} />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;