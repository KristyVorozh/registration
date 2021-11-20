import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request) => {
    let accessToken = localStorage.getItem("accessToken");
    request.headers = {
        "Authorization": `Bearer ${accessToken}`
    }
    return request;
});

axiosInstance.interceptors.response.use(response => response.data, (error) => {
    if (error.response.status === 401){
        localStorage.removeItem("accessToken");
        window.location.reload();
    }
});

export default axiosInstance;