import { Navigate, Outlet } from "react-router-dom";
import { useRealmContext } from "../db/RealmContext";
const PrivateRoutes = ({ name = "" }) => {
  const { currentUser } = useRealmContext();
  if (currentUser) {
    return <Outlet />;
  } else {
    <Navigate to={"/home"} />;
  }
};

export default PrivateRoutes;
