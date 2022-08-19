import axiosInstance from './axiosInstance'
import deleteAllCookies from './deleteCookies'
import getCookie from './getCookies'

let refresh = getCookie('refresh')
let access = getCookie("access_token")

const headers = {
    Authorization:
    `Bearer ${access}`,
    "Content-Type": "application/json",
}

export default function logout(){
    axiosInstance.post('/auth/logout/',{
        refresh
    },{
        headers : headers
    })
    .then((res)=>{
        deleteAllCookies()
        window.location = '/'
    })
}