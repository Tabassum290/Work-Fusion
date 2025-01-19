import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecret from "./UseAxiosSecret";


const UseHr = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = UseAxiosSecret();
    const {data : hr} = useQuery({
        queryKey:[user?.email ,'hr'],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/hr/${user.email}`)
            return res.data?.hr;
        }
    })
    return [hr];
};

export default UseHr;