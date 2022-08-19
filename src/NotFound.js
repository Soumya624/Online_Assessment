import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

export default function NotFound() {
    useEffect(()=>{
        window.location = '/'
    })
	return (
		<div
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%,-50%)",
				textAlign: "center",
				color: "black",
				fontSize: "3rem",
				background: "white",
				display: "grid",
				gridTemplateRows: "auto auto",
				fontWeight: "bolder",
				padding: "2em",
			}}
		>
			<span>404 NOT FOUND</span>
			<Button
				onClick={() => {
					window.location = "/";
				}}
				style={{ margin: "0 5em" }}
			>
				Home
			</Button>
		</div>
	);
}
