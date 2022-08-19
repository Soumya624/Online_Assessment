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
} from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
function Home() {
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
    <div style={{ padding: "0% 10%", fontSize: "90%" }}>
      <Card style={{ boxShadow: "0 8px 6px -6px black", border: "none" }}>
        <Navbar
          bg="white"
          expand="lg"
          style={{ backgroundColor: "white", padding: "1% 2%" }}
        >
          <Container fluid style={{ backgroundColor: "white" }}>
            <Navbar.Brand href="#">Test_Platform</Navbar.Brand>
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
                  variant="primary"
                  style={{ borderRadius: "20px" }}
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  Login Now
                </Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://skilloutlook.com/wp-content/uploads/2017/05/Resonace.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <Button
                variant="outline-primary"
                style={{ borderRadius: "20px" }}
              >
                View Details
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn.toprankers.net.in/images/jee-main-paper-2-sylabus-0259f9e1bb9ce.png"
              alt="Third slide"
            />

            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <br />
        <br />
        <p style={{ padding: "2% 2% 0% 2%" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <br />
        <br />
        <Row style={{ padding: "5%" }}>
          <Col md={6} style={{ padding: "1%" }}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://skilloutlook.com/wp-content/uploads/2017/05/Resonace.jpg"
                  alt="Second slide"
                />

                <Carousel.Caption>
                  {/* <Button
                    variant="outline-primary"
                    style={{ borderRadius: "20px" }}
                  >
                    View Details
                  </Button> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://cdn.toprankers.net.in/images/jee-main-paper-2-sylabus-0259f9e1bb9ce.png"
                  alt="Third slide"
                />

                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col md={6} style={{ padding: "1%" }}>
            <iframe
              style={{ width: "100%", height: "90%" }}
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
            ></iframe>
            <p>
              <marquee>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
              </marquee>
            </p>
          </Col>
        </Row>
        <br />
        <div
          style={{
            backgroundColor: "#0d6efd",
            padding: "3%",
            textAlign: "center",
            color: "white",
          }}
        >
          All Rights Reserved © 2022 Test_Platform
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <center>
              <h3>Login Here</h3>
              <br />
            </center>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter Email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Enter Password" />
              </Form.Group>
              <a href="#" style={{ textDecoration: "none" }}>
                Forgot Password?
              </a>
              <br />
              <br />
              <center>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ borderRadius: "20px" }}
                >
                  Click Here to Login Now
                </Button>
                <br />
                <a
                  onClick={handleShow1}
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "#0d6efd",
                  }}
                >
                  Signup Now
                </a>
              </center>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal
          show={show1}
          onHide={handleClose1}
          style={{ borderRadius: "20px" }}
        >
          <Modal.Body>
            <center>
              <h3>Register Here</h3>
              <br />
            </center>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control type="email" placeholder="Your Name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Your Email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Enter Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Re-Enter Password" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="formBasicCheckbox"
                style={{ display: "flex" }}
              >
                <Form.Check type="checkbox" label="Teacher" />
                &nbsp;&nbsp;
                <Form.Check type="checkbox" label="Student" />
              </Form.Group>
              <br />
              <center>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ borderRadius: "20px" }}
                >
                  Click Here to Register Now
                </Button>
                <br />
                <a
                  onClick={handleShow}
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                    color: "#0d6efd",
                  }}
                >
                  Login Now
                </a>
              </center>
            </Form>
          </Modal.Body>
        </Modal>
      </Card>
    </div>
  );
}

export default Home;
