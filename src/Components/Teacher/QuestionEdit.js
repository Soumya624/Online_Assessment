import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  Alert,
} from "react-bootstrap";
import { addQuestion, editQuestion, getQuestionById, getTestById } from "./actions";
import { Link, useParams, Navigate } from "react-router-dom";
import logout from "../../logout";
let user = JSON.parse(localStorage.getItem("user"));
const InputOption = ({
  setOptionIsCorrect,
  setOptionName,
  optionVal,
  option_name,
  inputList,
  setOptionId,
  option_list,
  setOptionList,
  id,
  option_checked
}) => {
  const[ option_val, setOptionVal ] = useState(optionVal)
  const [ checked, setChecked ] = useState(option_checked)
  return (
    <Row
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2%",
      }}
    >
      <Col xs={6}>
        <Form.Control
          type="text"
          value={option_val}
          placeholder="Enter the Option"
          style={{ width: "100%" }}
          onClick={(e) => {
            console.log(id)
            // console.log(e.target.checked)
            setOptionId(id);
            setOptionName(e.target.value);
          }}
          onChange={(e) => {
            if(id !== undefined) option_list[id].name = e.target.value
            else option_list[option_list.length-1].name = e.target.value
            setOptionVal(e.target.value)
            setOptionName(e.target.value);
          }}
        />
      </Col>
      <Col xs={6}>
        <Form.Check
          type="checkbox"
          checked = {checked}
          label="Is Correct"
          style={{ margin: "1%" }}
          onClick={(e) => {
            setOptionId(id);
            setOptionName(e.target.value);
          }}
          onChange={(e) => {
            console.log(id)
            console.log(e.target.checked)
            if(id !== undefined) option_list[id].is_correct = e.target.checked
            else option_list[option_list.length-1].is_correct = e.target.checked
            setChecked(e.target.checked)
            setOptionIsCorrect(e.target.checked);
          }}
        />
      </Col>
    </Row>
  );
};

var question_data = {
  positive_marks: 0,
  negative_marks: 0,
  is_range_present: false,
  lowest_mark: 0,
  highest_mark: 0,
};
export default function () {
  const dispatch = useDispatch();
  const { test_id, id } = useParams();

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


  useEffect(() => {
    // alert("Please Click on The Save Button After Adding an Option");
      setLoading(true);
      dispatch(
        getTestById(test_id, (res) => {
          if (res.status === 200) {
            setLoading(false);
          } else {
            console.log(res);
          }
        })
      );
    }, [dispatch, id]);

  useEffect(() => {
    // alert("Please Click on The Save Button After Adding an Option");
      setLoading(true);
      dispatch(
        getQuestionById(id, (res) => {
          if (res.status === 200) {
            let data = res.data
            let options = data.options
            let list = []
            setQuestionName(data.name)
            setOptionList(options)
            options.map((op,i)=>{
              list.push(
              <InputOption
                setOptionId={setOptionId}
                option_list = {options}
                inputList={list}
                optionVal = {op.name}
                option_checked = { op.is_correct }
                option_name={option_name}
                setOptionName={setOptionName}
                setOptionIsCorrect={setOptionIsCorrect}
                key={list.length}
                id = {i}
              />)
            })

            setQuestionPositiveMarks(data.positive_marks)
            setQuestionNegativeMarks(data.negative_marks)
            setInputList(list)
            setLoading(false);
          }
        })
      );
    }, [dispatch, id]);


    

  const test = useSelector((state) => state.tests.test);

  const [question, setQuestion] = useState(question_data);
  const [question_name, setQuestionName] = useState(null);
  const [option_name, setOptionName] = useState(null);
  const [option_ischecked, setOptionIsCorrect] = useState(false);
  const [option_list, setOptionList] = useState([]);
  const [option_id, setOptionId] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [positive_marks, setQuestionPositiveMarks] = useState(0)
  const [negative_marks, setQuestionNegativeMarks] = useState(0)
  const [msg, setMsg] = useState(null);
  
  function editQuestionFunc() {
    const data = {
      ...question,
      name: question_name,
      positive_marks,
      negative_marks,
      options: option_list,
    };

    dispatch(
      editQuestion(id,data, (res) => {
        if(res.status === 200){
          setMsg({
            isError : false,
            message : "Update Successful"
          })
          setQuestion(res.data)
        }else{
          setMsg({
            isError : true,
            message : res.data
          })
        }
      })
    );
  }

  const [flag1, setFlag1] = useState(1);
  const [show, setShow] = useState(true);
  var typeofquestion = "";
  const [inputList, setInputList] = useState([]);
  const onAddBtnClick = (event) => {
    let op_lis = []
    let option_data = {
      name : null,
      is_correct  : false
    }
    if (true) {
      op_lis.push(
        option_data
      )
      setOptionList(
        option_list.concat(
          option_data
        )
      )
      setInputList(
        inputList.concat(
          <InputOption
            op_lis = {op_lis}
            setOptionId={setOptionId}
            inputList={inputList}
            setOptionList = {setOptionList}
            option_list = {op_lis}
            optionVal = {option_list.name}
            option_checked = { option_list.is_correct }
            option_name={option_name}
            setOptionName={setOptionName}
            setOptionIsCorrect={setOptionIsCorrect}
            key={inputList.length}
          />
        )
      );
    }
  };


  if (isLoading) {
    return <h1 style={{ color: "white" }}>Loading...</h1>;
  }

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
                  logout()
                }}
              >
                Logout Now
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {msg && (
        <Alert
        style={{
          textAlign:"center",
          margin:"0 10em"
        }}
        variant={msg.isError ? "danger" : "success"}
        >
          {msg.message}
        </Alert>
      )}
      <Row style={{ padding: "0%", height: "50rem" }}>
        <Col md={9} style={{ padding: "4%" }}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicQuestion">
              <Form.Label>Enter Your Question</Form.Label>
              <Form.Control
                value={question_name}
                type="test"
                autoComplete="off"
                style={{ height: "5rem" }}
                onChange={(e) => {
                  // question.name = e.target.value;
                  setQuestionName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicQuestionMarks">
              <Row>
                <Col md={6}>
                  <Form.Label>Enter Positive Marks</Form.Label>
                  <Form.Control
                    value = {positive_marks}
                    type="name"
                    autoComplete="off"
                    onChange={(e) => {
                      setQuestionPositiveMarks(e.target.value);
                    }}
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Enter Negative Marks</Form.Label>
                  <Form.Control
                    value={negative_marks}
                    type="name"
                    autoComplete="off"
                    onChange={(e) => {
                      setQuestionNegativeMarks(e.target.value);
                    }}
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAnswer">
              <Form.Label for="type">Choose Your Question Type {""}</Form.Label>
              <select
                id="type"
                name="type"
                style={{
                  margin: "1%",
                  border: "none",
                  borderBottom: "1px solid #d4d9df",
                }}
                onChange={(e) => {
                  typeofquestion = String(e.target.value);
                  if (typeofquestion === "Options") {
                    setFlag1(1);
                  }else if(typeofquestion === "Fill in the Blanks") setFlag1(0)
                }}
              >
                {/* <option value="Null">Choose</option>
                <option value="Single Correct">Single Correct</option>
                <option value="Multiple Correct">Multiple Correct</option> */}
                <option value="Options">Options</option>
                <option value="Fill in the Blanks">Fill in The Blank</option>
              </select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicSingle"
              style={{ display: flag1 ? "block" : "none" }}
            >
              <div>
                <Button
                  variant="outline-primary"
                  style={{ margin: "0%" }}
                  onClick={onAddBtnClick}
                >
                  Add Option
                </Button>
                {inputList}
              </div>
            </Form.Group>
          </Form>
          <center>
            <br />
            <br />
            <Button
              variant="outline-primary"
              style={{ borderRadius: "20px", margin: "0.5%" }}
              onClick={editQuestionFunc}
            >
              Update The Changes
            </Button>
            <Button
              variant="outline-primary"
              style={{ borderRadius: "20px", margin: "0.5%" }}
            >
              Publish Changes
            </Button>
            <Button variant="outline-primary"
              style={{ borderRadius: "20px", margin: "0.5%" }}
              href = {`/question/${test_id}/`}
              >
                Add Question
            </Button>
            <Button variant="outline-primary"
              style={{ borderRadius: "20px", margin: "0.5%" }}
              href = '/teacher'
              >
                Go Back
            </Button>
          </center>
        </Col>
        <Col
          md={3}
          style={{
            backgroundColor: "#f5f5f5",
            padding: "2%",
          }}
        >
          <center>
            <Row>
              <>
                {test.questions &&
                  test.questions.map(function (x, i) {
                    return (
                      <Col xs={2} style={{ margin: "1.5%" }}>
                        <Button
                          style={{
                            borderRadius: "50%",
                            backgroundColor: "white",
                            borderColor: "black",
                            color: "black",
                          }}
                          href={`/question/${test_id}/${x.id}/edit`}
                        >
                          {i + 1 >= 1 && i + 1 <= 9 ? `0${i + 1}` : i + 1}
                        </Button>{" "}
                      </Col>
                    );
                  })}
              </>
            </Row>
          </center>
        </Col>
      </Row>
    </div>
  );
}
