import axiosInstance from "../../axiosInstance";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { addTest } from "./actions";
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
  FormControl
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Img_Demo from "../Images/images.png";
import TestCreated from "./TestCreated";
import getCookie from "../../getCookies";
import logout from "../../logout";
import { useCountdownTimer } from 'use-countdown-timer';

var data = {
  name: "",
  instruction: "",
  questions: [],
  isFixed: true,
  exam_start_time: null,
  exam_end_time: null,
  show_result: true,
  students: [],
  discipline: "",
};

let access = getCookie("access_token");
let user = JSON.parse(localStorage.getItem("user"));

const headers = {
  Authorization: `Bearer ${access}`,
  "Content-Type": "application/json",
};
export default function () {
  const dispatch = useDispatch();
  var time = "";
  var name = user.name;
  var email = user.email;
  var phone = user.phone;

  var identity = user.user_type.toUpperCase();
  if (identity === "STUDENT") {
    return (
      <>
        <h1
          style={{
            background: "rgba(255,255,255,0.5)",
            textAlign: "center",
            textTransform: "uppercase",
            height: "100vh",
          }}
        >
          You are not allowed to access the Page
        </h1>
        <Navigate to={"/"} />
      </>
    );
  }

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

  const [isfixed, setIsFixed] = useState(false);
  const [tests, setTests] = useState([]);
  const [test_details, setTestDetails] = useState(null);
  const [discipline, setDiscipline] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/api/tests/", {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        setTests(res.data);
      });
  }, []);

  function createTest() {
    console.log(submitData);
    dispatch(
      addTest(submitData, (res) => {
        if (res.status === 201) {
          console.log(res);
          window.location = `/question/${res.data.unique_id}`;
        } else {
          console.log(res);
        }
      })
    );
  }

  function viewResult(id) {
    axiosInstance
      .get(`/api/result/${id}/`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Enter Subject
  const [submitData, setSubmitData] = useState(data);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: 1000 * 5,
  });
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
      <Row style={{ padding: "0%" }}>
        <Col md={9} style={{ padding: "2%" }}>
          <Row>
            {tests.map((test) => (
              <TestCreated
                test={test}
                name={test.name}
                description={test.instructions}
                time={time}
                setSubject={setSubject}
                setDescription={setDescription}
                setInstructions={setInstructions}
                handleShow={handleShow}
                setTestDetails={setTestDetails}
              />
            ))}
          </Row>
          <br />
          <br />
          <br />
          <br />
          <center>
            <Button
              variant="outline-primary"
              style={{ borderRadius: "20px" }}
              onClick={handleShow1}
            >
              Create New
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

            {/* <Button variant="outline-primary" style={{ borderRadius: "20px" }}>
							Edit Profile
						</Button> */}
          </center>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body style={{ padding: "5%" }}>
          <center>
            <h3>{subject}</h3>
            <p>{description}</p>
          </center>
          <br />
          <p>
            <b>Instructions</b>
          </p>
          <p>{instructions ? instructions : "No Instructions Given"}</p>
          <br />
          <br />

          <center>
            {test_details && (
              <Button
                variant="outline-primary"
                style={{ borderRadius: "20px", margin: "0.5%" }}
                href={`/question/${test_details.id}/${test_details.q_id}/edit`}
              >
                Edit Exam
              </Button>
            )}

            <Button
              variant="outline-primary"
              style={{ borderRadius: "20px", margin: "0.5%" }}
              onClick={() => {
                window.location = `/teacher_result/${test_details.id}`;
              }}
            >
              View Result
            </Button>
          </center>
        </Modal.Body>
      </Modal>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Body style={{ padding: "5%" }}>
          <center>
            <p>
              <b>Please Fill the Exam Details</b>
            </p>
          </center>
          <br />
          <Form.Group className="mb-3" controlId="formBasicSingle">
            <Form.Label>Test Name</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              onChange={(e) => {
                submitData.name = e.target.value;
                setSubmitData(submitData);
              }}
            />
            <br />
            <Row>
              <Col xs={6}>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  disabled={!isfixed}
                  type="datetime-local"
                  onChange={(e) => {
                    submitData.exam_start_time = e.target.value;
                    setSubmitData(submitData);
                  }}
                />
              </Col>
              <Col xs={6}>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  disabled={!isfixed}
                  type="datetime-local"
                  onChange={(e) => {
                    submitData.exam_end_time = e.target.value;
                    setSubmitData(submitData);
                  }}
                />
              </Col>
            </Row>
            <br />
            <Form.Label>Specify Instructions</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              required={true}
              onChange={(e) => {
                submitData.instruction = e.target.value;
                setSubmitData(submitData);
              }}
              style={{ height: "5rem" }}
            />
            <br />
            <Form.Group controlId="formBasicDiscipline">
			<Form.Label>Enter Discipline</Form.Label>
              <FormControl
                type="text"
                name="discipline"
                list="discipline"
                onChange={(e) => {
                  e.preventDefault();
				  submitData.discipline = e.target.value;
				  setDiscipline(e.target.value);
				  setSubmitData(submitData);
                }}
              />
              <datalist id="discipline">
                <option value="Agriculture" />
                <option value="Allied Health Sciences" />
                <option value="Anumation, VFX and Gaming Design" />
                <option value="Architecture" />
                <option value="Arts" />
                <option value="Basic Science" />
                <option value="Commerce" />
                <option value="Computer Application" />
                <option value="Dental" />
                <option value="Design" />
                <option value="Economics" />
                <option value="Education" />
                <option value="Engineering" />
                <option value="Food Science" />
                <option value="Law" />
                <option value="Management" />
                <option value="Mass Communication" />
                <option value="Medical" />
                <option value="Nursing" />
                <option value="Pharmacy" />
                <option value="Visual Arts" />
              </datalist>
            </Form.Group>
			<br/>
			{/* <Form.Label>Specify Time (In Seconds)</Form.Label>
            <Form.Control
              type="text"
              autoComplete="off"
              required={true}
              onChange={(e) => {
				e.preventDefault();
              }}
            />
			<br/> */}
            <div>
              <Row>
                <Col xs={6}>
                  <Form.Check
                    type="checkbox"
                    label="Show Results"
                    onChange={(e) => {
                      submitData.show_result = e.target.checked;
                      setSubmitData(submitData);
                    }}
                  />
                </Col>
                <Col xs={6}>
                  <Form.Check
                    type="checkbox"
                    label="Add Test Window"
                    onChange={(e) => {
                      setIsFixed(e.target.checked);
                      submitData.isFixed = e.target.checked;
                      setSubmitData(submitData);
                    }}
                  />
                </Col>
              </Row>
            </div>
          </Form.Group>
          <br />
          <center>
            <Button
              onClick={(e) => {
                createTest();
              }}
              variant="outline-primary"
              style={{ borderRadius: "20px" }}
            >
              Create Test
            </Button>
          </center>
        </Modal.Body>
      </Modal>
    </div>
  );
}
