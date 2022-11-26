import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
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

import PInfoExperienceAndEducation from "./pages/Pinfo/PInfoExperienceAndEducation";
import PInfoPersonalDetailsAndSkills from "./pages/Pinfo/PInfoPersonalDetailsAndSkills";

import PostProject from "./pages/PostProject/PostProject";
import Chat from "./pages/Chat";

import PrivateRoutes from "./Routes/PrivateRoutes";
import { useRealmContext } from "./db/RealmContext";
import AuthRoutes from "./Routes/AuthRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//EmployerSide
import EDashborad from "./pages/EDashboard/EDashboard";
import EProjects from "./pages/EProjects/EProjects";
import EFavourites from "./pages/EFavourites/EFavourites";
import EReviews from "./pages/EReviews/EReviews";
import EMessages from "./pages/EMessages/EMessages";
import ETeams from "./pages/ETeams/ETeams";
import EPayments from "./pages/EPayments/EPayments";
import ESettings from "./pages/ESettings/ESettings";
//FreeLancerSide
import FDashboard from "./pages/FDashboard/FDashboard";
import FProjects from "./pages/FProjects/FProjects";
import Favourites from "./pages/FFavourites/FFavourites";
import FReviews from "./pages/FReviews/FReviews";
import FMessages from "./pages/FMessages/FMessages";
import FTeams from "./pages/FTeams/FTeams";
import FPayments from "./pages/FPayments/FPayments";
import FSettings from "./pages/FSettings/FSettings";
import FGigs from "./pages/FGigs/FGigs";
import Dashboard from "./components/SellerDashboardRenders/Dashboard";
import CompleteProfile from "./pages/CompleteProfile/CompleteProfile";

import TempPage from "./pages/TempPage/TempPage";
import CreateGig from "./pages/CreateGig";
import axios from "axios";

function App(props) {
  const [open, setOpen] = useState(false);
  const [activeChatroom, setActiveChatroom] = useState(false);
  const [activeChatroomStatus, setActiveChatroomStatus] = useState(false);
  const { chatrooms, setChatrooms } = useState([]);
  const { currentUser, user } = useRealmContext();

  return (
    <CustomContextProvider
      value={{
        open,
        setOpen,
        activeChatroom,
        setActiveChatroom,
        chatrooms,
        setChatrooms,
        activeChatroomStatus,
        setActiveChatroomStatus,
      }}
    >
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
            {/* <Route path="/sellerdashboard" element={<SellerDashboard />}>
              <Route path="favourites" element={<Favourites />} />
              <Route index element={<Dashboard />} />
            </Route> */}
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/gig/:name" element={<CreateGig />} />

            <Route
              path="/becomeSeller"
              element={<PInfoPersonalDetailsAndSkills />}
            />
            <Route path="/cprofile" element={<CompleteProfile />}></Route>
            <Route
              path="/pexperience"
              element={<PInfoExperienceAndEducation />}
            />

            <Route path="/postProject" element={<PostProject />} />
            <Route path="/s/dashboard" element={<EDashborad />} />
            <Route path="/s/projects" element={<EProjects />} />
            <Route path="/s/favourites" element={<EFavourites />} />
            <Route path="/s/reviews" element={<EReviews />} />
            <Route path="/s/messages" element={<EMessages />} />
            <Route path="/s/teams" element={<ETeams />} />
            <Route path="/s/payments" element={<EPayments />} />
            <Route path="/s/settings" element={<ESettings />} />

            <Route path="/f/dashboard" element={<FDashboard />} />
            <Route path="/f/gigs" element={<FGigs />} />
            <Route path="/f/projects" element={<FProjects />} />
            <Route path="/f/favourites" element={<Favourites />} />
            <Route path="/f/reviews" element={<FReviews />} />
            <Route path="/f/messages" element={<FMessages />} />
            <Route path="/f/teams" element={<FTeams />} />
            <Route path="/f/payments" element={<FPayments />} />
            <Route path="/f/settings" element={<FSettings />} />
          </Route>
          <Route path="/portfolio/:id" element={<SellerPortfolio />} />
          <Route path="/profile/:id" element={<SellerProfile />} />
          <Route path="/temp" element={<TempPage />} />

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
