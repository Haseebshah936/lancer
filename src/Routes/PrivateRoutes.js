import { Navigate, Outlet } from "react-router-dom";
import { useRealmContext } from "../db/RealmContext";
const PrivateRoutes = ({ name = "" }) => {
  const { currentUser } = useRealmContext();
  return currentUser ? <Outlet /> : <Navigate to={"/home"} />;
};

export default PrivateRoutes;
