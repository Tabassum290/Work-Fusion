import { useQuery } from "@tanstack/react-query";
import UseAxiosSecret from "./UseAxiosSecret";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const UseWork = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = UseAxiosSecret();

    const { data: works = [], refetch } = useQuery({
        queryKey: ['works'],
        queryFn: async () => {
          const res = await axiosSecure.get(`/works/${user.email}`);
          console.log(res.data);
          return res.data;
        }
      });
      
      return [works,refetch]
};

export default UseWork;