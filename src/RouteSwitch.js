import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Header";
import Builder from "./Components/Builder";
import TeamList from "./Components/TeamList";


const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/builder" exact element={<Builder />} />
        <Route path="/teams" element={<TeamList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;