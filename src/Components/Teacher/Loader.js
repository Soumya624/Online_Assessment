import React from 'react'
import loading from "../Images/loader.gif";

export default function Loader() {
  return (
    <div style={{
      position:"absolute",
      background:"rgba(255,255,255,0.85)",
      width : "100vw",
      height:"100vh",
      display:"flex",
      alignItems : "center",
      justifyContent:"center",
      flexDirection : "column"
    }}>
      <img src={loading} alt="loader" />
      <p>Don't close the window. It will take time</p>
    </div>
  )
}
