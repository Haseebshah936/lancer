import { Navigate, Outlet } from "react-router-dom";
import { useRealmContext } from "../db/RealmContext";
const PrivateRoutes = ({ name = "" }) => {
  const { currentUser } = useRealmContext();
  console.log("PrivateRoutes currentUser", currentUser);
  return currentUser ? <Outlet /> : <Navigate to={"/home"} />;
};

export default PrivateRoutes;
