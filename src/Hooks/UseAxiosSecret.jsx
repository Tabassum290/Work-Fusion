import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { useEffect, useState } from "react";

export const axiosSecure = axios.create({
  baseURL: "https://assignment-12-server-iota-steel.vercel.app",
});

const UseAxiosSecret = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      console.log("status error", status);

      if (status === 401 || status === 403) {
        setRedirect(true);
        await logOut();
      }
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    if (redirect) {
      navigate("/login");
    }
  }, [redirect, navigate]);

  return axiosSecure;
};

export default UseAxiosSecret;
