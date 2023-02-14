import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Header";
import Builder from "./Components/Builder";


const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/builder" exact element={<Builder />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;