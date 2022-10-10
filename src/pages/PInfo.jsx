import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import ActivePageMarker from "../components/ActivePageMarker";

export default function PInfo() {
  const location = useLocation();
  const [pathName, setPathName] = useState(location.pathname);

  console.log("pathname", location.pathname);
  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);
  return (
    <div>
      <Header></Header>
      <div className="container d-flex to-row">
        <div>
          <RRDLink
            to="/pinfo/personaldetailsandskills"
            className="d-flex to-row"
          >
            {pathName === "/pinfo/personaldetailsandskills" ? (
              <ActivePageMarker></ActivePageMarker>
            ) : null}
            <Div>Personal Details & Skills</Div>
          </RRDLink>

          <RRDLink to="/pinfo/experienceandeducation" className="d-flex to-row">
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
        <div className="ms-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
// const Div = styled.div`
//   border: 1px solid black;
// `;
const Div = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.6rem;
`;
const RRDLink = styled(Link)`
  text-decoration: none;
`;
