import axios from "axios";

console.log(process.env.REACT_APP_BASE_URL)

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "https://salty-savannah-75623.herokuapp.com/",
})

export default axiosInstance