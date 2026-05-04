import axios from "axios";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {

    const { user } = useAuth();
    
    axiosInstance.interceptors.request.use((config) => {
        // console.log(config);
        config.headers.authorization = `Bearer ${user.accessToken}`;
        return config;
    })

    return axiosInstance;
}

export default useAxiosSecure;