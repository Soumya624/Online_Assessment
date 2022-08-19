import axios from "axios";

console.log(process.env.REACT_APP_BASE_URL)

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000/",
})

export default axiosInstance