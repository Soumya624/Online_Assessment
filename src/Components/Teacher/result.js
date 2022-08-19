import axiosInstance from "../../axiosInstance";
import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  Button,
  NavDropdown,
  NavbarBrand,
  Carousel,
  CarouselItem,
  CarouselControl,
  Card,
  Row,
  Col,
  Modal,
  ButtonGroup,
  Table,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import getCookie from "../../getCookies";
import logout from "../../logout";
import Img_Demo from "./../Images/images.png";

let access = getCookie('access_token')

const headers = {
  Authorization:
  `Bearer ${access}`,
  "Content-Type": "application/json",
}
export default function () {

  const { test_id } = useParams()
  const [result, setResult ] = useState([])

  useEffect(()=>{
    axiosInstance
      .get(`/api/ranking/${test_id}/`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data);
        if(res.status === 200){
          setResult(res.data)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },[])

  var name = "Adam";
  var subject = "Physics";
  var description =
    "Objective Questions on Motion in a Frame of Reference of a Particular Body";
  var time = "2 Days Ago";
  var name = "Adam Smith";
  var identity = "Teacher";
  var email = "adamsmith@gmail.com";
  var phone = "1234567890";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setShow1(false);
  };
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
    setShow(false);
  };
  return (
    <div style={{ backgroundColor: "white", overflowX: "hidden" }}>
      <Navbar
        bg="#f5f5f5"
        expand="lg"
        style={{ backgroundColor: "#f5f5f5", padding: "1% 2%" }}
      >
        <Container fluid style={{ backgroundColor: "#f5f5f5" }}>
          <Navbar.Brand href="#">Hello User</Navbar.Brand>
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
                  logout()
                }}
              >
                Logout Now
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row style={{ padding: "0%" }}>
        <Col md={9} style={{ padding: "3%", height : "100vh" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Test Id</th>
                <th>Student Email</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {result.map((r,i)=>{
                return (
                  <tr>
                  <td>{i+1}</td>
                  <td>{r.student.user.username}</td>
                  <td>
                    <input
                      value={r.marks_obtained}
                      style={{ border: "none", backgroundColor: "transparent" }}
                    />
                  </td>
                </tr>
                )
              })}
            </tbody>
          </Table>
          <br />
          <br />
          <br />
          <center>
            <Button
              variant="outline-primary"
              style={{ borderRadius: "20px", margin: "0.5%" }}
            >
              Save Changes
            </Button>
            <Button
              variant="outline-primary"
              style={{ borderRadius: "20px", margin: "0.5%" }}
              href="/teacher"
            >
              Go Back
            </Button>
          </center>
        </Col>

        <Col
          md={3}
          style={{
            backgroundColor: "#f5f5f5",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <center>
            <br />
            <br />
            <img src={Img_Demo} style={{ width: "50%", borderRadius: "50%" }} />
            <br />
            <br />
            <br />
            <p style={{ marginTop: "0", marginBottom: "0" }}>
              <b>Name: </b>
              {name}
            </p>
            <p style={{ marginTop: "0", marginBottom: "0" }}>
              <b>Identity: </b>
              Admin
            </p>
            <p style={{ marginTop: "0", marginBottom: "0" }}>
              <b>Phone: </b>
              {phone}
            </p>

            <p style={{ marginTop: "0", marginBottom: "0" }}>
              <b>Email: </b>
              {email}
            </p>
            <br />
            <br />

            <Button variant="outline-primary" style={{ borderRadius: "20px" }}>
              Edit Profile
            </Button>
          </center>
        </Col>
      </Row>
    </div>
  );
}
