import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader";
import UseAdmin from "../Hooks/UseAdmin";

const AdminRoute = ({ children }) => {
  const [isAdmin, isAdminLoading] = UseAdmin();
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  console.log("Loading States:", { loading, isAdminLoading });

  if (loading || isAdminLoading) {
    return <Loader />;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
