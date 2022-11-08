import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import * as Realm from "realm-web";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Signup from "./pages/Signup";
import { CustomContextProvider } from "./Hooks/useCustomContext";
import Ranking from "./pages/Ranking";
import ContactUs from "./pages/ContactUs";
import SellerProfile from "./pages/SellerProfile";
import SellerPortfolio from "./pages/SellerPortfolio";
import SearchResults from "./pages/SearchResults";
import BuyerMain from "./pages/BuyerMain";
import SellerDashboard from "./pages/SellerDashboard";

import GigServiceIntroduction from "./pages/GigCreation/GigServiceIntroduction";
import GigMediaAttachment from "./pages/GigCreation/GigMediaAttachment";
import GigMyServicePricing from "./pages/GigCreation/GigMyServicePricing";
import GigQuestionAPage from "./pages/GigCreation/GigQuestionAPage";
import PostProject from "./pages/PostProject/PostProject";
import Chat from "./pages/Chat";
import EProjects from "./pages/EmployerProjects/EProjects";
import FProjects from "./pages/FreelancerProjects/FProjects";
import PrivateRoutes from "./Routes/PrivateRoutes";
import { useRealmContext } from "./db/RealmContext";
import AuthRoutes from "./Routes/AuthRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/SellerDashboardRenders/Dashboard";
import Favourites from "./components/SellerDashboardRenders/Favourites";

function App(props) {
  const [open, setOpen] = useState(false);
  return (
    <CustomContextProvider value={{ open, setOpen }}>
      <Router>
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route path="/home" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route path="/Search" element={<SearchResults />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/buyermain" element={<BuyerMain />} />
            <Route path="/sellerdashboard" element={<SellerDashboard />}>
              <Route path="favourites" element={<Favourites />} />
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="/chat/:id" element={<Chat />} />
            <Route
              path="/gig/gigserviceintroduction"
              element={<GigServiceIntroduction />}
            />
            <Route
              path="/gig/gigmediaattachment"
              element={<GigMediaAttachment />}
            />
            <Route
              path="/gig/gigmyservicepricning"
              element={<GigMyServicePricing />}
            />
            <Route
              path="/gig/gigquestionapage"
              element={<GigQuestionAPage />}
            />
            <Route path="/postProject" element={<PostProject />} />
          </Route>
          <Route path="/portfolio/:id" element={<SellerPortfolio />} />
          <Route path="/profile/:id" element={<SellerProfile />} />
          <Route path="/eprojects/:id" element={<EProjects />} />
          <Route path="/fprojects/:id" element={<FProjects />} />

          <Route path="/" element={<Navigate to="/home" replace />} />
          {/* <Route path="*" element={<Navigate to="/home" replace />} /> */}
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </CustomContextProvider>
  );
}

export default App;
const Container = styled.div`
  font-size: 1rem;
`;
