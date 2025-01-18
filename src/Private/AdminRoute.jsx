import { useContext } from "react";
import UseAdmin from "../Hooks/UseAdmin";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader";


const AdminRoute = ({children}) => {
    const [isAdmin,isAdminLoading] = UseAdmin();
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading || isAdminLoading){
        return <Loader/>
    }
    if(user && isAdmin) {
        return children;
    }
    return <Navigate to='/' state={{from: location}} replace></Navigate>
};

export default AdminRoute;