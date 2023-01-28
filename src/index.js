import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CloudinaryContext } from "cloudinary-react";
import { RealmAppProvider } from "./db/RealmContext";
import { createTheme, ThemeProvider } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RealmAppProvider appId={"lance-ickhd"}>
    <GoogleOAuthProvider clientId="30719619583-j2d2baepb0dkbscqrm3661mb6bomooch.apps.googleusercontent.com">
      <CloudinaryContext cloudName="dhc9yqbjh">
        <ThemeProvider
          theme={createTheme({
            breakpoints: {
              values: {
                laptop: 1024,
                tablet: 640,
                mobile: 0,
                desktop: 1280,
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
              },
            },
          })}
        >
          <App />
        </ThemeProvider>
      </CloudinaryContext>
    </GoogleOAuthProvider>
  </RealmAppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
