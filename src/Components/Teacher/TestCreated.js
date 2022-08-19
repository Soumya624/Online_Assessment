import { Card, Col, Button } from "react-bootstrap";

function TestCreated(props) {
	console.log(props)
	return (
		<Col md={4}>
			<Card
				className="text-center"
				style={{
					margin: "1%",
				}}
			>
				<Card.Header>Featured</Card.Header>
				<Card.Body>
					<Card.Title>{props.name}</Card.Title>
					{/* <Card.Text
						style={{
							textAlign: "justify",
						}}
					>
						{props.description}
					</Card.Text> */}
					<br />
					<Button
						variant="outline-primary"
						style={{
							borderRadius: "20px",
						}}
						onClick={()=>{
							props.setSubject(props.subject)
							props.setInstructions(props.description)
							props.handleShow()
							props.setTestDetails({
								id : props.test.unique_id,
								q_id : props.test.questions[0].id
							})
							// window.location = `/question/${props.test.unique_id}/${props.test.questions[0].id}/edit`
						}}
					>
						View Details
					</Button>
				</Card.Body>
				<Card.Footer className="text-muted">{props.time}</Card.Footer>
			</Card>
		</Col>
	);
}

export default TestCreated

