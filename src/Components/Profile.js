/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import axiosInstance from '../axiosInstance';
import logout from '../logout'
import getCookie from '../getCookies'


let access = getCookie("access_token");

const headers = {
Authorization: `Bearer ${access}`,
"Content-Type": "application/json",
};

const host = 'http://127.0.0.1:8000'
let user_data = JSON.parse(localStorage.getItem("user"));

export default function Profile() {
    const [ user, setUser ] = useState(user_data)
    const [ profile, setProfile ] = useState(null)
    const user_type = user.user_type
    var name = `${user.first_name} ${user.last_name}`;

    function uploadImage(e){
        e.preventDefault()
        let username = user.username
        if(profile){
            let form_data = new FormData()
            form_data.append("username",username);
            form_data.append("profile",profile)

            axiosInstance.patch('/auth/edit/',form_data,{
                headers : headers
            })
            .then((res)=>{
                if(res.status === 200){
                    localStorage.removeItem("user")
                    localStorage.setItem("user",JSON.stringify(res.data))
                    setUser(res.data)
                }
            })
            .catch((e)=>{
                console.log(e.response)
            })
        }
    }

  return (
    <div style={{ backgroundColor: "white", overflowX: "hidden", }}>
        <Navbar
        bg="#f5f5f5"
        expand="lg"
        style={{ backgroundColor: "#f5f5f5", padding: "1% 2%" }}
      >
        <Container fluid style={{ backgroundColor: "#f5f5f5" }}>
          <Navbar.Brand href={user_type}>Hello {name}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{
                maxHeight: "100px",
              }}
              navbarScroll
            ></Nav>
            <Form className="d-flex">
              {/* <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#">Contact Us</Nav.Link> */}
              <Button
                variant="outline-primary"
                style={{ borderRadius: "20px" }}
                onClick={() => {
                  logout();
                }}
              >
                Logout Now
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{
        display :"flex",
        justifyContent : "center",
        // background:"red",
        height : "200px"
      }}>
        <div style={{
            width:"19em",
            height:"19em",
            display :"flex",
            border : "1px solid black",
            justifyContent : "center",
            borderRadius:"50%",
            position : "relative",
            overflow : "hidden"
        }}>
            <img style={{
                width : "100%",
                height : "100%",
                overflow : "hidden",
                objectFit: "cover"
            }} src={`${host}${user.profile}`} alt = "Image Profile"  />
        </div>
      </div>
      <Form onSubmit={uploadImage} style={{margin : "10%"}}>
        <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value = {name}/>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" value = {user.email}/>
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control type="text" value = {user.mobile_number}/>
            <Form.Label>Upload Profile Image</Form.Label>
            <Form.Control type = "file" onChange={e=>{
                setProfile(e.target.files[0])
            }}/>
        </Form.Group>
        <br/>
        <Button type="submit" variant="outline-primary">Save Changes</Button>
      </Form>
    </div>
  )
}
