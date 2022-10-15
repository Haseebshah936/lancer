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
import Gallery from "./pages/SellerGig/Gallery";

const images = [
  {
    url: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
    type: "img",
  },
  {
    url: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
    type: "img",
  },
  {
    url: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
    type: "img",
  },
  {
    url: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
    type: "img",
  },
  {
    url: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
    type: "img",
  },
  {
    url: "https://api.lorem.space/image/car?w=1000&h=600",
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
    type: "img",
  },
  {
    thumbnail: "https://api.lorem.space/image/car?w=250&h=150",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    type: "video",
  },
];

function App(props) {
  const [open, setOpen] = useState(false);
  return (
    <CustomContextProvider value={{ open, setOpen }}>
      <Router>
        <Routes>
          <Route path="/" element={<SellerGig />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/home" element={<Landing />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </CustomContextProvider>
    // <BuyerDashboard></BuyerDashboard>
    // <Gallery items={images}/>
  );
}

export default App;
const Container = styled.div`
  font-size: 1rem;
`;
