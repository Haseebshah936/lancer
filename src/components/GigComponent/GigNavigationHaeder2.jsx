import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";

export default function GigNavigationHaeder2() {
  const location = useLocation();
  const [pathName, setPathName] = useState(location.pathname);
  useEffect(() => {
    setPathName(location.pathname);
    console.log("pathname", `${location.pathname}`);
  }, [location.pathname]);
  return (
    <Grid
      container
      style={{
        display: "flex",
        justifyContent: "center",
        // marginTop: "3vw",
        marginLeft: { xs: "0px", md: "10px" },
        marginRight: { xs: "0px", md: "10px" },
      }}
    >
      <Grid item xs={3} sm={2} md={2}>
        <div>
          <h3 className="text-center ps-1"> Service</h3>
          <h3 className="text-center ps-1"> Introduction </h3>
          <div
            style={{
              width: "100%",
              height: "2px",
              backgroundColor:
                pathName === "/gig/gigserviceintroduction"
                  ? "#62D693"
                  : "#F6F6F6",
            }}
          ></div>
        </div>
      </Grid>
      <Grid item xs={3} sm={2} md={2}>
        <div>
          <h3 className="text-center"> Media/ </h3>
          <h3 className="text-center ps-3"> Attachments</h3>
          <div
            style={{
              width: "100%",
              height: "2px",
              backgroundColor:
                pathName === "/gig/gigmediaattachment" ? "#62D693" : "#F6F6F6",
            }}
          ></div>
        </div>
      </Grid>
      <Grid item xs={3} sm={2} md={2}>
        <div>
          <h3 className="text-center"> My Service </h3>
          <h3 className="text-center ps-3"> Pricings</h3>
          <div
            style={{
              width: "100%",
              height: "2px",
              backgroundColor:
                pathName === "/gig/gigmyservicepricning"
                  ? "#62D693"
                  : "#F6F6F6",
            }}
          ></div>
        </div>
      </Grid>
      <Grid item xs={3} sm={2} md={2}>
        <div>
          <h3 className="text-center"> Common</h3>
          <h3 className="text-center ps-3"> Questions </h3>
          <div
            style={{
              width: "100%",
              height: "2px",
              backgroundColor:
                pathName === "/gig/gigquestionapage" ? "#62D693" : "#F6F6F6",
            }}
          ></div>
        </div>
      </Grid>
    </Grid>
  );
}

// const h4 = styled.h4`
//   font-size: 1.5rem;
// `;
// const h3 = styled.h3`
//   font-size: 1.5rem;
// `;
