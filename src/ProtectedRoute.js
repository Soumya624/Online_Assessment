import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import getCookie from './getCookies'

export default function ProtectedRoute() {
    let access = getCookie("access_token")
    return (
        access ? <Outlet/> : <Navigate to={"/login"} />
    )
}