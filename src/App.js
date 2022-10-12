import React, { useState } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Landing from "./pages/Landing";
import HowitWork from "./pages/HowitWork";
import About from "./pages/About";
import Signup from "./pages/Signup";
import { CustomContextProvider } from "./Hooks/useCustomContext";
import Ranking from "./pages/Ranking";
import ContactUs from "./pages/ContactUs";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerGig from "./pages/SellerGig";

function App(props) {
  const [open, setOpen] = useState(false);
  return (
    // <CustomContextProvider value={{ open, setOpen }}>
    //   <Router>
    //     <Routes>
    //       <Route path="/" element={<SellerGig />} />
    //       <Route path="/howitwork" element={<HowitWork />} />
    //       <Route path="/about" element={<About />} />
    //       <Route path="/contactus" element={<ContactUs />} />
    //       <Route path="/signup" element={<Signup />} />
    //       <Route path="/ranking" element={<Ranking />} />
    //       <Route path="/home" element={<Landing />} />
    //       <Route path="*" element={<Navigate to="/home" replace />} />
    //     </Routes>
    //   </Router>
    // </CustomContextProvider>
    <BuyerDashboard></BuyerDashboard>
  );
}

export default App;
const Container = styled.div`
  font-size: 1rem;
`;
