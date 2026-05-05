import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {

    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        //request interceptor
        const requestInterceptor = axiosInstance.interceptors.request.use(config => {
            config.headers.authorization = `Bearer ${user.accessToken}`;
            return config;
        })


        //response interceptor
        const responseInterceptor = axiosInstance.interceptors.response.use(res => {
            return res;
        }, err => {
            console.log("error object", err);
            if (err.status === 401 || err.status === 403) {
                logOut()
                    .then(() => {
                        navigate("/login");
                    })
            }
            return Promise.reject(err);
        })

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor)
            axiosInstance.interceptors.response.eject(responseInterceptor)
        }

    }, [user,logOut,navigate])

    // axiosInstance.interceptors.request.use((config) => {
    //     // console.log(config);
    //     config.headers.authorization = `Bearer ${user.accessToken}`;
    //     return config;
    // })

    return axiosInstance;
}

export default useAxiosSecure;