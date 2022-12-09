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
import FileUpload from './pages/TempPage/FileUpload';
import OrderStatus from './pages/OrderStatus/OrderStatus';

function App(props) {
  const [open, setOpen] = useState(false);
  const [activeChatroom, setActiveChatroom] = useState(false);
  const [activeChatroomStatus, setActiveChatroomStatus] = useState(false);
  const { chatrooms, setChatrooms } = useState([]);
  const { currentUser, user } = useRealmContext();
  const [activeProfile, setActiveProfile] = useState(false);
  const [editGigStatus, setEditGigStatus] = useState(false);
  const [gigToBeEditedData, setGigToBeEditedData] = useState({});

  const [searchData, setSearchData] = useState([]);
  const [terms, setTerms] = useState("");
  const [searchDataLoader, setSearchDataLoader] = useState(true);

  useEffect(() => {
    setActiveProfile(JSON.parse(localStorage.getItem("activeProfile")));
  }, [currentUser]);

  return (
    <CustomContextProvider
      value={{
        searchDataLoader,
        setSearchDataLoader,
        terms,
        setTerms,
        searchData,
        setSearchData,
        open,
        setOpen,
        activeChatroom,
        setActiveChatroom,
        chatrooms,
        setChatrooms,
        activeChatroomStatus,
        setActiveChatroomStatus,
        activeProfile,
        setActiveProfile,
        editGigStatus,
        setEditGigStatus,
        gigToBeEditedData,
        setGigToBeEditedData,
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
          <Route path="/portfolio/:id" element={<SellerPortfolio />} />

          <Route path="/Search" element={<SearchResults />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/buyermain" element={<BuyerMain />} />
            <Route path="/sellerdashboard" element={<SellerDashboard />}>
              <Route path="favourites" element={<Favourites />} />
              <Route index element={<Dashboard />} />
            </Route>

            <Route path="/chat" element={<Chat />} />
            <Route path="/createGig" element={<CreateGig />} />
            <Route path="/editGig" element={<CreateGig />} />

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
            <Route path="/e/dashboard" element={<EDashborad />} />
            <Route path="/e/projects" element={<EProjects />} />
            <Route path="/e/favourites" element={<EFavourites />} />
            <Route path="/e/reviews" element={<EReviews />} />
            <Route path="/e/messages" element={<EMessages />} />
            <Route path="/e/teams" element={<ETeams />} />
            <Route path="/e/payments" element={<EPayments />} />
            <Route path="/e/settings" element={<ESettings />} />

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
          <Route path="/profile/:id" element={<SellerProfile />} />
          <Route path="/temp" element={<TempPage />} />
          {/* just temp haseeb bata donst worry */}
          <Route path="/uploadImage" element={<FileUpload />} />\
          {/* just temp haseeb bata donst worry */}

          <Route path="/orderStatus" element={<OrderStatus />} />

          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
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
