import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecret from "./UseAxiosSecret";


const UseFired = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = UseAxiosSecret();
    const {data : isFired} = useQuery({
        queryKey:[user?.email ,'isFired'],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/fired/${user.email}`)
            return res.data?.fired;
        }
    })
    return [isFired];
};

export default UseFired;