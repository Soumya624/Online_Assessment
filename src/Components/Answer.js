import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "react-bootstrap";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import Img_Demo from "./Images/Registration.jpg";
import { getQuestionById } from "./Teacher/actions";
import axiosInstance from "../axiosInstance";
import getCookie from "../getCookies";
import { useCountdownTimer } from "use-countdown-timer";

let access = getCookie("access_token");
let user = JSON.parse(localStorage.getItem("user"));

const headers = {
	Authorization: `Bearer ${access}`,
	"Content-Type": "application/json",
};
export default function () {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	if (user.user_type === "teacher") {
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

	const { test_id, question_id } = useParams();
	// useEffect(()=>{
	//   dispatch(
	//     getQuestionById(question_id,(res)=>{
	//       console.log(res)
	//     })
	//   )
	// },[])

	const questions = useSelector((state) => state.tests.test.questions);
	const is_fixed = useSelector((state) => state.tests.test.isFixed);
	const exam_start_time = useSelector(
		(state) => state.tests.test.exam_start_time,
	);
	const exam_end_time = useSelector((state) => state.tests.test.exam_end_time);
	const [submission_id, setSubmissionId] = useState(null);
	const [answers, setAnswers] = useState(null);
	const [checkedOptions, setCheckedOptions] = useState([]);
	const [submission_check, setSubmissionCheck] = useState([]);
	const [subjective_answer, setSubjectiveAnswer] = useState(null);
	const ques = questions.filter((q) => {
		return q.id == question_id;
	});

	let question_paper = ques[0];

	var type = question_paper.type;
	var positive = question_paper.positive_marks;
	var negative = question_paper.negative_marks;
	var arrayOne = question_paper.options;
	var arrayTwo = question_paper.options;
	var numberofUnanswered = submission_check.filter(
		(subs) =>
			subs.answer_submitted.length === 0 && subs.subjective_answer === null,
	).length;
	var numberofAnswered = submission_check.filter(
		(subs) => subs.is_attempted,
	).length;
	var numberofUnattempted = questions.length - numberofAnswered;
	var numberofMarkedforreview = submission_check.filter(
		(subs) => subs.is_reviewed,
	).length;
	var question = question_paper.name;

	let end_time = new Date(exam_end_time);
	let start_time_exam = new Date(exam_start_time);
	let start_time = new Date();
	console.log(is_fixed);
	if (is_fixed && start_time_exam.getTime() - start_time.getTime() >= 0) {
		return (
			<div
				style={{
					position: "absolute",
					top: "50vh",
					left: "50vw",
					background: "white",
					width: "40vw",
					height: "40vh",
					transform: "translate(-50%,-50%)",
					textAlign: "center",
				}}
			>
				<h1
					style={{
						position: "relative",
						top: "50%",
						transform: "translateY(-50%)",
					}}
				>
					Exam has not started yet
				</h1>
			</div>
		);
	}

	let timer = end_time.getTime() - start_time.getTime();
	const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
		timer: timer,
	});

	console.log(timer);
	useEffect(() => {
		if (timer <= 1000) {
			pause();
			submitQuestion();
		}
	}, [countdown]);

	let countdown_secs = parseInt(countdown / 1000);
	let days = parseInt(countdown_secs / (3600 * 24));
	let hours = parseInt((countdown_secs - days * 3600 * 24) / 3600);
	let mins = parseInt((countdown_secs - days * 3600 * 24 - hours * 3600) / 60);
	let secs = parseInt(
		countdown_secs - days * 24 * 3600 - hours * 3600 - mins * 60,
	);

	useEffect(() => {
		setSubjectiveAnswer(null);
		setAnswers(null);
		axiosInstance
			.get(`/api/submission/${test_id}/`, {
				headers: headers,
			})
			.then((res) => {
				console.log(res.data);
				if (res.status === 200) {
					setSubmissionCheck(res.data);
				}
			});
		start();
		axiosInstance
			.get(`/api/submission/${test_id}/${question_id}`, {
				headers: headers,
			})
			.then((res) => {
				if (res.status === 200) {
					console.log(res.data);
					if (res.data.length > 0) {
						setAnswers(res.data[0]);
						setSubjectiveAnswer(res.data[0].subjective_answer);
						let options = res.data[0].answer_submitted;
						let list = [];
						for (let op of options) {
							list.push(op.id);
						}
						setCheckedOptions(list);
						setSubmissionId(res.data.id);
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [question_id]);

	console.log(subjective_answer);

	async function saveAttempts() {
		let data = {
			question: question_id,
			answer_submitted: checkedOptions,
			is_attempted: true,
			subjective_answer: subjective_answer,
			is_reviewed: false,
			type: type,
		};

		console.log(answers);

		if (answers) {
			await axiosInstance
				.patch(`/api/submission/${test_id}/${question_id}/`, data, {
					headers: headers,
				})
				.then((res) => {
					console.log(res);
					if (res.status === 200) {
						setAnswers(res.data);
					}
				});
		} else {
			await axiosInstance
				.post(`/api/submission/${test_id}/${parseInt(question_id)}/`, data, {
					headers: headers,
				})
				.then((res) => {
					console.log(res);
					if (res.status === 201) {
						setAnswers(res.data);
					}
				});
		}

		axiosInstance
			.get(`/api/submission/${test_id}/`, {
				headers: headers,
			})
			.then((res) => {
				console.log(res.data);
				setSubmissionCheck(res.data);
			});
	}

	function submitQuestion() {
		let ans = [];
		for (let sub of submission_check) {
			ans.push(sub.id);
		}

		let data = {
			name: "Attempt 1",
			submissions: ans,
		};

		console.log(data);

		axiosInstance
			.post(`/api/attempts/${test_id}/`, data, {
				headers: headers,
			})
			.then((res) => {
				if (res.status === 201) {
					window.location = "/student";
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async function saveReview() {
		const data = {
			is_attempted: true,
			is_reviewed: true,
		};
		console.log(answers);
		if (answers) {
			await axiosInstance
				.patch(`/api/submission/${test_id}/${question_id}/`, data, {
					headers: headers,
				})
				.then((res) => {
					console.log(res);
					if (res.status === 200) {
						// setAnswers(null);
					}
				});
		} else {
			await axiosInstance
				.post(`/api/submission/${test_id}/${parseInt(question_id)}/`, data, {
					headers: headers,
				})
				.then((res) => {
					if (res.status === 201) {
						// setAnswers(null);
					}
				});
		}

		await axiosInstance
			.get(`/api/submission/${test_id}/`, {
				headers: headers,
			})
			.then((res) => {
				console.log(res.data);
				// console.log(http://127.0.0.1:8000/api/result/{{test_id}}/)
				setSubmissionCheck(res.data);
			});
	}

	const style = {
		is_attempted: {
			borderRadius: "50%",
			backgroundColor: "#68b45a",
			border: "none",
		},
		is_reviewed: {
			borderRadius: "50%",
			backgroundColor: "#7b449e",
			border: "none",
		},
		not_visited: {
			borderRadius: "50%",
			backgroundColor: "white",
			borderColor: "black",
			color: "black",
		},
		not_answered: {
			borderRadius: "50%",
			backgroundColor: "#c6462f",
			border: "none",
		},
	};

	return (
		<div style={{ backgroundColor: "white", overflowX: "hidden" }}>
			<Navbar
				bg="#f5f5f5"
				expand="lg"
				style={{ backgroundColor: "#f5f5f5", padding: "1% 2%" }}
			>
				<Container fluid style={{ backgroundColor: "#f5f5f5" }}>
					<Navbar.Brand href="#">Select {type} Correct Answer</Navbar.Brand>
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
							+{positive} For Right Answer/-{negative} For Wrong Answer
						</Form>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Row style={{ padding: "0%", height: "50rem" }}>
				<Col md={9} style={{ padding: "4%" }}>
					<br />
					<p style={{ margin: "2%" }}>{question}</p>
					<br />
					<Form
						style={{
							margin: "2%",
							display: type === "Single Correct" ? "block" : "none",
						}}
					>
						{arrayOne.map((item, index) => {
							return (
								<div>
									<input
										type="radio"
										id={item.id}
										name="fav_language"
										value={item}
										checked={
											checkedOptions.filter((ans) => ans === item.id).length > 0
										}
										onChange={(e) => {
											let l = [item.id];
											setCheckedOptions(l);
										}}
									/>
									<label for={item.name}>&nbsp;{item.name}</label>
								</div>
							);
						})}
					</Form>
					<Form
						style={{
							margin: "2%",
							display: type === "Multiple Correct" ? "block" : "none",
						}}
					>
						{arrayTwo.map((item, index) => {
							return (
								<div>
									<input
										type="checkbox"
										id={item}
										name="fav_language"
										value={item}
										checked={
											checkedOptions.filter((ans) => ans === item.id).length > 0
										}
										onChange={(e) => {
											console.log(e.target.checked);
											let checkedOpts = checkedOptions;
											checkedOpts = checkedOpts.filter((ch) => {
												return ch !== item.id;
											});
											if (e.target.checked) {
												checkedOpts.push(item.id);
											} else {
												checkedOpts = checkedOpts.filter((ch) => {
													return ch !== item.id;
												});
											}
											setCheckedOptions(checkedOpts);
										}}
									/>
									<label for={item.name}>&nbsp;{item.name}</label>
								</div>
							);
						})}
					</Form>
					<Form
						style={{
							margin: "2%",
							display: type === "Fill in the Blanks" ? "block" : "none",
						}}
					>
						<input
							type="text"
							value={subjective_answer ? subjective_answer : ""}
							placeholder="Enter Your Answer"
							style={{
								borderTop: "none",
								borderRight: "none",
								borderLeft: "none",
								borderBottom: "1px solid black",
								width: "70%",
								padding: "1%",
							}}
							onChange={(e) => {
								setSubjectiveAnswer(e.target.value);
							}}
						/>
					</Form>
					<br />
					<Row
						style={{
							width: "100%",
							margin: "0",
							display: window.innerWidth < 768 ? "" : "none",
						}}
					>
						<Row style={{ margin: "0.5%" }}>
							<Col xs={6}>
								<Button
									style={{
										backgroundColor: "#68b45a",
										color: "white",
										border: "none",
										margin: "0.5% 0.5% 0.5% 1%",
										fontSize: "100%",
										width: "100%",
									}}
									onClick={saveAttempts}
								>
									Save
								</Button>
							</Col>
							<Col xs={6}>
								<Button
									style={{
										backgroundColor: "#7b449e",
										color: "white",
										border: "none",
										margin: "0.5%",
										fontSize: "100%",
										width: "100%",
									}}
									onClick={() => {
										saveReview();
									}}
								>
									Mark for Review
								</Button>
							</Col>
						</Row>
						<Row style={{ margin: "0.5%" }}>
							{/* <Col xs={6}>
                <Button
                  style={{
                    backgroundColor: "#ffffff",
                    color: "black",
                    borderColor: "black",
                    margin: "0.5%",
                    fontSize: "100%",
                    width: "100%",
                  }}
                >
                  Clear Response
                </Button>
              </Col> */}
							<Col xs={6}>
								<Button
									style={{
										backgroundColor: "#68b45a",
										color: "white",
										border: "none",
										margin: "0.5% 1% 0.5% 0.5%",
										fontSize: "100%",
										width: "100%",
									}}
									onClick={submitQuestion}
								>
									Submit & Close
								</Button>
							</Col>
						</Row>
					</Row>
				</Col>
				<Col
					md={3}
					style={{
						backgroundColor: "#f5f5f5",
						padding: "2%",
					}}
				>
					<p
						style={{
							background: "#a1ffa1",
							textAlign: "center",
							color: "green",
							border: "green 0.1px solid",
							padding: "5px",
						}}
					>
						<b>
							Time Remaining: {days} : {hours} : {mins} : {secs}{" "}
						</b>
					</p>
					<Row style={{ padding: "4%" }}>
						<Row style={{ padding: "2%" }}>
							<Col xs={6}>
								<Button
									style={{
										borderRadius: "50%",
										backgroundColor: "white",
										borderColor: "black",
										color: "black",
									}}
								>
									{numberofUnattempted}
								</Button>{" "}
								Unattempt
							</Col>
							<Col xs={6}>
								<Button
									style={{
										borderRadius: "50%",
										backgroundColor: "#c6462f",
										border: "none",
									}}
								>
									{numberofUnanswered}
								</Button>{" "}
								Not Answer
							</Col>
						</Row>
						<Row style={{ padding: "2%" }}>
							<Col xs={6}>
								<Button
									style={{
										borderRadius: "50%",
										backgroundColor: "#68b45a",
										border: "none",
									}}
								>
									{numberofAnswered}
								</Button>{" "}
								Answered
							</Col>
							<Col xs={6}>
								<Button
									style={{
										borderRadius: "50%",
										backgroundColor: "#7b449e",
										border: "none",
									}}
								>
									{numberofMarkedforreview}
								</Button>{" "}
								For Review
							</Col>
						</Row>
					</Row>
					<br />
					<br />
					<center>
						<p>
							<b>Your Questions</b>
						</p>
						<Row>
							{questions.map((question, i) => {
								let check = submission_check.filter(
									(s) => s.question === question.id,
								);
								let btn_style = null;
								if (check.length === 0) {
									btn_style = style.not_visited;
								} else {
									if (check[0].is_reviewed) btn_style = style.is_reviewed;
									else if (
										check[0].answer_submitted.length === 0 &&
										check[0].subjective_answer === null
									) {
										btn_style = style.not_answered;
									} else if (check[0].is_attempted)
										btn_style = style.is_attempted;
								}
								return (
									<Col xs={2} style={{ margin: "1.5%" }}>
										<Button
											style={btn_style}
											onClick={() => {
												setCheckedOptions([]);
												navigate(`/answer/${test_id}/${question.id}`);
											}}
										>
											{i + 1 >= 1 && i + 1 <= 9 ? `0${i + 1}` : i + 1}
										</Button>{" "}
									</Col>
								);
							})}
						</Row>
					</center>
				</Col>
			</Row>
			<Row
				style={{
					backgroundColor: "#f5f5f5",
					position: "fixed",
					bottom: "0",
					width: "100%",
					margin: "0",
					display: window.innerWidth > 768 ? "" : "none",
				}}
			>
				<Col xs={8}>
					<div style={{ display: "flex" }}>
						<Button
							style={{
								backgroundColor: "#68b45a",
								color: "white",
								border: "none",
								margin: "0.5% 0.5% 0.5% 1%",
								fontSize: "100%",
							}}
							onClick={saveAttempts}
						>
							Save
						</Button>
						<Button
							style={{
								backgroundColor: "#7b449e",
								color: "white",
								border: "none",
								margin: "0.5%",
								fontSize: "100%",
							}}
							onClick={() => {
								saveReview();
							}}
						>
							Mark for Review
						</Button>
						{/* <Button
              style={{
                backgroundColor: "#ffffff",
                color: "black",
                borderColor: "black",
                margin: "0.5%",
                fontSize: "100%",
              }}
            >
              Clear Response
            </Button> */}
					</div>
				</Col>
				<Col xs={4} style={{ textAlign: "right" }}>
					<Button
						style={{
							backgroundColor: "#68b45a",
							color: "white",
							border: "none",
							margin: "0.5% 1% 0.5% 0.5%",
							fontSize: "100%",
						}}
						onClick={submitQuestion}
					>
						Submit & Close
					</Button>
				</Col>
			</Row>
		</div>
	);
}
