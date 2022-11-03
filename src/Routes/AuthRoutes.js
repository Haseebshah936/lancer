import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRealmContext } from "../db/RealmContext";

function AuthRoutes(props) {
  const { currentUser } = useRealmContext();
  return !currentUser ? <Outlet /> : <Navigate to={"/buyermain"} replace />;
}

export default AuthRoutes;
