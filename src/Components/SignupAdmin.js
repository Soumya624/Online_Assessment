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
    setShow(true);
    setShow1(false);
  };
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
    setShow(false);
  };
  const [first_name, setFirst_name] = useState(null);
  const [last_name, setLast_name] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone_number, setPhone_number] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [username, setUsername] = useState(null);
  const [user_type, setUser_type] = useState(null);
  const [msg, setMsg] = useState(null);
  const [otp, setOtp] = useState(null);

  function submit(e) {
    e.preventDefault();
    // let data = {
    //   first_name: first_name,
    //   last_name: last_name,
    //   email: email,
    //   phone_number: phone_number,
    //   user_type: "teacher",
    //   city: city,
    //   state: state,
    //   username: email,
    // };
    // console.log(data);
	let dataOne = {
	      phone: phone_number,
	    };
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
    // axios
    //   .post("/auth/register/", data)
    //   .then((res) => {
    //     console.log(res);
    //     console.log(res.data);
    //     setMsg({
    //       is_error: false,
    //       msg: "Success! Please Verify Your Number",
    //     });

    //     setTimeout(() => {
    //       setMsg(null);
    //     }, 1000);

    //     let dataOne = {
    //       phone: phone_number,
    //     };
    //     console.log(dataOne);
    //     // axios
    //     //   .post("/auth/verify/", dataOne)
    //     //   .then((res) => {
    //     //     console.log(res);
    //     //     console.log(res.data);
    //     //     setShow(true);
    //     //   })
    //     //   .catch((err) => {
    //     //     console.log(err);
    //     //   });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setMsg({
    //       is_error: true,
    //       msg: JSON.stringify(err.response.data),
    //     });

    //     setTimeout(() => {
    //       setMsg(null);
    //     }, 1000);
    //   });
  }

  async function register_user(){
	let data = {
		first_name: first_name,
		last_name: last_name,
		email: email,
		phone_number: phone_number,
		user_type: "teacher",
		city: city,
		state: state,
		username: email,
	  };
	axiosInstance
      .post("/auth/register/", data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setMsg({
          is_error: false,
          msg: "Success!!",
        });

        setTimeout(() => {
			window.location = '/login'
          	setMsg(null);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setMsg({
          is_error: true,
          msg: JSON.stringify(err.response.data),
        });

        setTimeout(() => {
          setMsg(null);
        }, 1000);
      });
  }

  function submitOtp(e) {
    e.preventDefault();
    let dataTwo = {
      phone: phone_number,
      otp: otp,
    };
    axiosInstance
      .post("/auth/verify-otp/", dataTwo)
      .then(async (res) => {
        console.log(res);
        console.log(res.data);
		if(res.data.status){
			console.log("Successfully verified")
			await register_user()
		}
        if (res.data.status == false)
          setMsg({
            is_error: !res.data.status,
            msg: res.data.detail,
          });
        setTimeout(() => {
          setMsg(null);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setMsg({
          is_error: true,
          msg: "Error",
        });

        setTimeout(() => {
          setMsg(null);
        }, 1000);
      });
  }
  return (
    <>
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
                <Row>
                  <Col md="6">
                    <Form.Group controlId="formBasicFirstName">
                      <Form.Control
                        type="text"
                        placeholder="Enter Your First Name"
                        style={{ borderRadius: "20px" }}
                        onChange={(e) => {
                          e.preventDefault();
                          setFirst_name(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group controlId="formBasicLastName">
                      <Form.Control
                        type="text"
                        placeholder="Enter Your Last Name"
                        style={{ borderRadius: "20px" }}
                        onChange={(e) => {
                          e.preventDefault();
                          setLast_name(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md="6">
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="email"
                        placeholder="Enter Your Email ID"
                        style={{ borderRadius: "20px" }}
                        onChange={(e) => {
                          e.preventDefault();
                          setEmail(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group controlId="formBasicNumber">
                      <Form.Control
                        type="text"
                        placeholder="Enter Phone Number"
                        style={{ borderRadius: "20px" }}
                        onChange={(e) => {
                          e.preventDefault();
                          setPhone_number(e.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Form.Group controlId="formBasicState">
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Sate"
                    style={{ borderRadius: "20px" }}
                    onChange={(e) => {
                      e.preventDefault();
                      setState(e.target.value);
                    }}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="formBasicCity">
                  <Form.Control
                    type="email"
                    placeholder="Enter Your City"
                    style={{ borderRadius: "20px" }}
                    onChange={(e) => {
                      e.preventDefault();
                      setCity(e.target.value);
                    }}
                  />
                </Form.Group>
                <br />
                <center>
                  {msg && (
                    <Alert variant={msg.is_error ? "danger" : "success"}>
                      {msg.msg}
                    </Alert>
                  )}
                  <Button
                    variant="outline-primary"
                    style={{ margin: "1%", borderRadius: "20px", width: "30%" }}
                    onClick={submit}
                  >
                    Submits
                  </Button>
                  <Button
                    variant="outline-primary"
                    style={{ margin: "1%", borderRadius: "20px", width: "30%" }}
                  >
                    Cancel
                  </Button>
                  <p>
                    Already Have an Account?
                    <a href="/login" style={{ textDecoration: "none" }}>
                      {" "}
                      Login
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
              {msg && (
                <Alert variant={msg.is_error ? "danger" : "success"}>
                  {msg.msg}
                </Alert>
              )}
              <Button
                variant="outline-primary"
                style={{ margin: "1%", borderRadius: "20px", width: "30%" }}
                onClick={submitOtp}
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
    </>
  );
}

export default Login;
