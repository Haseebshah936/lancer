import React, { useState } from "react";
import styled from "styled-components";
import Header from "./compontents/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import HowitWork from "./pages/HowitWork";
import About from "./pages/About";
import Discover from "./pages/Discover";
import Signup from "./pages/Signup";
import { CustomContextProvider } from "./Hooks/useCustomContext";
function App(props) {
  const [open, setOpen] = useState(false);
  return (
    <CustomContextProvider value={{ open, setOpen }}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/howitwork" element={<HowitWork />} />
          <Route path="/about" element={<About />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </CustomContextProvider>
  );
}

export default App;
const Container = styled.div`
  font-size: 1rem;
`;
