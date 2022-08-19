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
import { addQuestion, getTestById } from "./actions";
import { Link, useParams } from "react-router-dom";
import logout from "../../logout";
const InputOption = ({
  setOptionIsCorrect,
  setOptionName,
  optionVal,
  option_name,
  inputList,
  setOptionId,
  option_list,
  setOptionList
}) => {
  
  const[ option_val, setOptionVal ] = useState(optionVal)
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
            setOptionId(inputList.length);
            setOptionName(e.target.value);
          }}
          onChange={(e) => {
            option_list[option_list.length-1].name = e.target.value
            setOptionVal(e.target.value)
            setOptionName(e.target.value);
          }}
        />
      </Col>
      <Col xs={6}>
        <Form.Check
          type="checkbox"
          label="Is Correct"
          style={{ margin: "1%" }}
          onChange={(e) => {
            option_list[option_list.length-1].is_correct = e.target.checked
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

var option_data = {
  name: null,
  is_correct: false,
};

export default function () {
  const dispatch = useDispatch();
  const { id } = useParams();


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
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    setLoading(true);
    dispatch(
      getTestById(id, (res) => {
        if (res.status === 200) {
          setLoading(false);
        } else {
          console.log(res);
        }
      })
    );
  }, [dispatch, id]);

  function createQuestion() {
    const data = {
      test: id,
      ...question,
      positive_marks,
      negative_marks,
      name: question_name,
      options: option_list,
      type : typeofquestion
    };    

    dispatch(
      addQuestion(data, (res) => {
        if (res.status === 200) {
          setInputList([]);
          setOptionList([]);
          setQuestionName("");
          setOptionName(null);
          setQuestionPositiveMarks(0)
          setQuestionNegativeMarks(0)
          setQuestion(question_data);
          setOptionIsCorrect(false)

          setMsg({
            isError : false,
            message : "Upload Successful"
          });

          setTimeout(()=>{
            setMsg(null)
          },3000)
        } else {
          setMsg({
            isError : true,
            message : res.data
          });

          setTimeout(()=>{
            setMsg(null)
          },3000)
        }
      })
    );
  }

  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(false);
  const [flag4, setFlag4] = useState(false);
  const [ isSaveClicked, setSaveClicked ] = useState(false)

  const [ typeofquestion, setTypeOfQuestion ] = useState("")
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
            option_name={option_name}
            setOptionName={setOptionName}
            setOptionIsCorrect={setOptionIsCorrect}
            key={inputList.length}
          />
        )
      );
    }
  };

  console.log(typeofquestion)

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
                    value={positive_marks}
                    type="test"
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
                    type="test"
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
                  let t = String(e.target.value);
                  setTypeOfQuestion(t)
                  if (t === "Multiple Correct" || t === "Single Correct" ) {
                    setFlag1(1);
                  }else if(t === "Fill in the Blanks") setFlag1(0)
                }}
              >
                <option value="Null" selected disabled>Choose</option>
                <option value="Single Correct">Single Correct</option>
                <option value="Multiple Correct">Multiple Correct</option>
                <option value="Fill in the Blanks">Fill in The Blank</option>
              </select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicTF"
              style={{ display: flag4 ? "block" : "none" }}
            >
              <div>
                <Button
                  variant="outline-primary"
                  style={{ margin: "0%" }}
                  onClick={onAddBtnClick}
                >
                  Add Option
                </Button>
                {/* <Button variant="outline-primary" style={{ marginLeft: "1%" }}>
                  Save
                </Button> */}
                {inputList}
              </div>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicBlank"
              style={{ display: flag3 ? "block" : "none" }}
            >
              <Form.Label>Enter the Correct Answer</Form.Label>
              <Form.Control type="email" />
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
                {/* <Button variant="outline-primary" style={{ marginLeft: "1%" }}>
                  Save
                </Button> */}
                {inputList}
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicMultiple"
              style={{ display: flag2 ? "block" : "none" }}
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
              onClick={createQuestion}
            >
              Create New
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
                          href={`/question/${id}/${x.id}/edit`}
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
