import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecret from "./UseAxiosSecret";


const UseAdmin = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = UseAxiosSecret();
    const {data : isAdmin} = useQuery({
        queryKey:[user?.email ,'isAdmin'],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            return res.data?.admin;
        }
    })
    return [isAdmin];
};

export default UseAdmin;