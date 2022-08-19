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
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Teacher from "./Components/Teacher";
import Student from "./Components/Student";
import Questions from "./Components/Teacher/Question";
import Answer from "./Components/Answer";
import QuestionEdit from "./Components/Teacher/QuestionEdit";
import TeacherResult from "./Components/Teacher/result";
import SignupAdmin from "./Components/SignupAdmin";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";
function App() {
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
		<div>
			<Router>
				<Routes>
					<Route path = "*" element = {<NotFound/>} />
					<Route path="/" element={<Home />} exact />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/signupadmin" element={<SignupAdmin />} />

					<Route path="/teacher" element={<ProtectedRoute />}>
						<Route path="/teacher" element={<Teacher />} />
					</Route>
					<Route path="/student" element={<ProtectedRoute />}>
						<Route path="/student" element={<Student />} />
					</Route>
					<Route path="/question/:id" element={<ProtectedRoute />}>
						<Route path="/question/:id" element={<Questions />} />
					</Route>
					<Route
						path="/answer/:test_id/:question_id"
						element={<ProtectedRoute />}
					>
						<Route path="/answer/:test_id/:question_id" element={<Answer />} />
					</Route>
					<Route
						path="/question/:test_id/:id/edit"
						element={<ProtectedRoute />}
					>
						<Route
							path="/question/:test_id/:id/edit"
							element={<QuestionEdit />}
						/>
					</Route>
					<Route path="/teacher_result/:test_id" element={<ProtectedRoute />}>
						<Route
							path="/teacher_result/:test_id"
							element={<TeacherResult />}
						/>
					</Route>
					{/* <Route path="/student" element={<Student/>} /> */}
					{/* <Route path="/question/:id" element={<Questions/>} /> */}
					{/* <Route path="/answer/:test_id/:question_id" element={<Answer/>} /> */}
					{/* <Route path="/question/:test_id/:id/edit" element={<QuestionEdit/>} /> */}
					{/* <Route path="/teacher_result/:test_id" element={<TeacherResult/>} /> */}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
