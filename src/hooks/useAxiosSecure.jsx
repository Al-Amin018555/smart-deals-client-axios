import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {

    const { user } = useAuth();

    useEffect(() => {
        //request interceptor
        const requestInterceptor = axiosInstance.interceptors.request.use(config => {
            config.headers.authorization = `Bearer ${user.accessToken}`;
            return config;
        })
        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor)
        }

    }, [user])

    // axiosInstance.interceptors.request.use((config) => {
    //     // console.log(config);
    //     config.headers.authorization = `Bearer ${user.accessToken}`;
    //     return config;
    // })

    return axiosInstance;
}

export default useAxiosSecure;