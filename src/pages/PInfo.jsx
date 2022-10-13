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
  const [bgMenuColor, setBgMenuColor] = useState([
    { color: "white" },
    { color: "#f2f2f2" },
  ]);

  useEffect(() => {
    setPathName(location.pathname);
    console.log("pathname", `${URL}${location.pathname}`);
  }, [location.pathname]);
  return (
    <>
      {/* <Header></Header> */}

      <div
        className="container border d-flex to-row rounded"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        <MobileViewDiv>
          <div className="container ms-5" style={{ width: "170px" }}>
            <RRDLink
              to="/pinfo/personaldetailsandskills"
              className="d-flex to-row rounded mt-4"
              style={{
                backgroundColor:
                  pathName === "/pinfo/personaldetailsandskills"
                    ? bgMenuColor[0].color
                    : bgMenuColor[1].color,
                width: "164px",
              }}
            >
              {pathName === "/pinfo/personaldetailsandskills" ? (
                <ActivePageMarker></ActivePageMarker>
              ) : null}
              <Div>Personal Details & Skills</Div>
            </RRDLink>
            <RRDLink
              to="/pinfo/experienceandeducation"
              className="d-flex to-row rounded"
              style={{
                backgroundColor:
                  pathName === "/pinfo/experienceandeducation"
                    ? bgMenuColor[0].color
                    : bgMenuColor[1].color,
                width: "164px",
              }}
            >
              {pathName === "/pinfo/experienceandeducation" ? (
                <ActivePageMarker></ActivePageMarker>
              ) : null}
              <Div>Experience & Education</Div>
            </RRDLink>
            <RRDLink
              to="/pinfo/pinfoprojectsandrewards"
              className="d-flex to-row rounded"
              style={{
                backgroundColor:
                  pathName === "/pinfo/pinfoprojectsandrewards"
                    ? bgMenuColor[0].color
                    : bgMenuColor[1].color,
                width: "164px",
              }}
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
    </>
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
  }
  background-color: #f2f2f2;
`;
const OutLetDiv = styled.div``;
