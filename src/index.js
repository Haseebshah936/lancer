import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CloudinaryContext } from "cloudinary-react";
import { RealmAppProvider } from "./db/RealmContext";
// import realmData from "./realm.json";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RealmAppProvider appId={"lance-ickhd"}>
    <GoogleOAuthProvider clientId="30719619583-j2d2baepb0dkbscqrm3661mb6bomooch.apps.googleusercontent.com">
      <CloudinaryContext cloudName="dhc9yqbjh">
        <App />
      </CloudinaryContext>
    </GoogleOAuthProvider>
  </RealmAppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
