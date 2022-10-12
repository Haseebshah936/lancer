import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { mobile, tablet, miniTablet } from "../responsive";
import styled from "styled-components";
import Header from "../components/Header";
import ActivePageMarker from "../components/ActivePageMarker";
import { URL } from "../Env";

export default function PInfo() {
  const location = useLocation();
  const [pathName, setPathName] = useState(location.pathname);

  console.log("pathname", `${URL}${location.pathname}`);
  useEffect(() => {
    setPathName(location.pathname);
    if (location.pathname === "/pinfo") {
      console.log("redirect");
      // return <Navigate to="/personaldetailsandskills" />;
    }
  }, [location.pathname]);
  return (
    <div>
      <Header></Header>

      <div className="d-flex to-row">
        <MobileViewDiv>
          <div className="container ms-5">
            <RRDLink
              to="/pinfo/personaldetailsandskills"
              className="d-flex to-row"
            >
              {pathName === "/pinfo/personaldetailsandskills" ? (
                <ActivePageMarker></ActivePageMarker>
              ) : null}
              <Div>Personal Details & Skills</Div>
            </RRDLink>
            <RRDLink
              to="/pinfo/experienceandeducation"
              className="d-flex to-row"
            >
              {pathName === "/pinfo/experienceandeducation" ? (
                <ActivePageMarker></ActivePageMarker>
              ) : null}
              <Div>Experience & Education</Div>
            </RRDLink>
            <RRDLink
              to="/pinfo/pinfoprojectsandrewards"
              className="d-flex to-row"
            >
              {pathName === "/pinfo/pinfoprojectsandrewards" ? (
                <ActivePageMarker></ActivePageMarker>
              ) : null}
              <Div>Project & Awards</Div>
            </RRDLink>
          </div>
        </MobileViewDiv>
        <div className="ms-md-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

const Div = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.6rem;
`;
const RRDLink = styled(Link)`
  text-decoration: none;
`;
const MobileViewDiv = styled.div`
  @media only screen and (min-width: 601px) {
    // margin-left: 5vw;
  }
  @media only screen and (max-width: 600px) {
    display: none;
    magin: 0;
  } ;
`;
const OutLetDiv = styled.div``;
