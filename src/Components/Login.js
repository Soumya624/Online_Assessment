import React, { useState } from "react";
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
  Alert,
} from "react-bootstrap";
import Img_Registration from "./Images/Registration.png";
import axiosInstance from "../axiosInstance";
function Login() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    let dataOne = {
      phone: phone,
    };
    console.log(dataOne);
    axiosInstance
      .post("/auth/verify/", dataOne)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
    setShow(false);
  };
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [otp, setOtp] = useState(null);
  const [phone, setPhone] = useState(null);
  const [ msg, setMsg ] = useState(null)


  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function submit(e) {
    e.preventDefault();
    let dataTwo = {
      phone: phone,
      otp: otp,
    };
    let dataThree = {
      username: username,
      password: otp,
    };
    console.log(dataTwo);
    console.log(dataThree);
    axiosInstance
      .post("/auth/verify-otp/", dataTwo)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if(res.data.status == false)
        setMsg(
          {
            is_error : !res.data.status,
            msg : res.data.detail
          }
        )
        setTimeout(()=>{
          setMsg(null)
        },1000)
      })
      .catch((err) => {
        console.log(err);
        setMsg(
          {
            is_error : true,
            msg : "Error"
          }
        )

        setTimeout(()=>{
          setMsg(null)
        },1000)
      });

    axiosInstance
      .post("/auth/login/", dataThree)
      .then((res) => {
        console.log(res);
        console.log(res.data);

        setMsg(
          {
            is_error : false,
            msg : "Successfully logged in"
          }
        )

        let token = res.data.token
        let user_data = res.data.user

        localStorage.setItem("user" , JSON.stringify(user_data))

        setCookie(`access_token` ,`${token.access}`,1);
        setCookie(`refresh` ,`${token.refresh}`,1);

        setTimeout(()=>{
          setMsg(null)
        },1000)
        
        let user_type = user_data.user_type

        window.location = `/${user_type}`


      })
      .catch((err) => {
        console.log(err);
        setMsg(
          {
            is_error : true,
            msg : "Error"
          }
        )

        setTimeout(()=>{
          setMsg(null)
        },1000)
      });
  }



  return (
    <div
      style={{
        padding: "0% 10%",
        fontSize: "90%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          boxShadow: "0 8px 6px -6px black",
          border: "none",
          padding: "2%",
          height: "50rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row style={{ alignItems: "center", justifyContent: "center" }}>
          <Col md="6">
            <img
              src={Img_Registration}
              alt="Registration"
              style={{ width: "100%", height: "100%" }}
            />
          </Col>
          <Col md="6">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="name"
                  placeholder="Enter your Email ID"
                  style={{ borderRadius: "20px" }}
                  onChange={(e) => {
                    e.preventDefault();
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicNumber">
                <Form.Control
                  type="text"
                  placeholder="Enter Your Mobile Number"
                  style={{ borderRadius: "20px" }}
                  onChange={(e) => {
                    e.preventDefault();
                    setPhone(e.target.value);
                  }}
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
              <br />
              <center>
              { msg && <Alert variant={msg.is_error ? "danger" : "success"}>{msg.msg}</Alert>}
                <Button
                  variant="outline-primary"
                  style={{ margin: "1%", borderRadius: "20px", width: "30%" }}
                  onClick={handleShow}
                >
                  Submit
                </Button>
                <Button
                  variant="outline-primary"
                  style={{ margin: "1%", borderRadius: "20px", width: "30%" }}
                >
                  Cancel
                </Button>
                <p>
                  Don't Have an Account?
                  <a href="/signup" style={{ textDecoration: "none" }}>
                    {" "}
                    Signup
                  </a>
                </p>
              </center>
            </Form>
          </Col>
        </Row>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <center>
            {" "}
            <p>
              <b>OTP Verification</b>
            </p>
          </center>

          <br />
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter the OTP Sent to Your Mobile Number"
              style={{ borderRadius: "20px" }}
              onChange={(e) => {
                e.preventDefault();
                setOtp(e.target.value);
              }}
            />
          </Form.Group>
          <br />
          <center>
            { msg && <Alert variant={msg.is_error ? "danger" : "success"}>{msg.msg}</Alert>}
            <Button
              variant="outline-primary"
              style={{ margin: "1%", borderRadius: "20px", width: "30%" }}
              onClick={submit}
            >
              Submit
            </Button>
            <Button
              variant="outline-primary"
              style={{ margin: "1%", borderRadius: "20px", width: "30%" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </center>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Login;
