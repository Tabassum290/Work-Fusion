import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://assignment-12-server-iota-steel.vercel.app",
});

const UseAxiosPublic = () => {
  return axiosPublic;
};

export default UseAxiosPublic;
