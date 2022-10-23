import React, { useState } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Signup from "./pages/Signup";
import { CustomContextProvider } from "./Hooks/useCustomContext";
import Ranking from "./pages/Ranking";
import ContactUs from "./pages/ContactUs";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerProfile from "./pages/SellerProfile";
import SellerPortfolio from "./pages/SellerPortfolio";
import GigServiceIntroduction from "./pages/GigCreation/GigServiceIntroduction";
import GigMediaAttachment from "./pages/GigCreation/GigMediaAttachment";
import GigMyServicePricing from "./pages/GigCreation/GigMyServicePricing";
import GigQuestionAPage from "./pages/GigCreation/GigQuestionAPage";

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
          <Route path="/home" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/buyerdashboard" element={<BuyerDashboard />} />
          <Route path="/portfolio/:id" element={<SellerPortfolio />} />
          <Route path="/profile/:id" element={<SellerProfile />} />
          <Route path="/gig/gigserviceintroduction" element={<GigServiceIntroduction />} />
          <Route path="/gig/gigmediaattachment" element={<GigMediaAttachment />} />
          <Route path="/gig/gigmyservicepricning" element={<GigMyServicePricing />} />
          <Route path="/gig/gigquestionapage" element={<GigQuestionAPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </CustomContextProvider>
  );
}

export default App;
const Container = styled.div`
  font-size: 1rem;
`;
