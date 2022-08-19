import { Card, Col, Button } from "react-bootstrap";
import axiosInstance from "../../axiosInstance";
import getCookie from "../../getCookies";
function TestCreated(props) {
  console.log(props);
  let access = getCookie("access_token");
  const headers = {
	Authorization: `Bearer ${access}`,
	"Content-Type": "application/json",
  };

  const handleRemoveItem = (e) => {
    console.log(props.test.unique_id);
	axiosInstance.delete(`/api/tests/${props.test.unique_id}`,{
		headers: headers,
	}).then((res) => {
		console.log(res);
		if(res.status === 200){
			window.location = "/teacher";
		}
	}
	).catch((err) => {
		console.log(err);
	})
  };
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
              margin: "1%",
            }}
            onClick={() => {
              props.setSubject(props.subject);
              props.setInstructions(props.description);
              props.handleShow();
              props.setTestDetails({
                id: props.test.unique_id,
                q_id: props.test.questions[0].id,
              });
              // window.location = `/question/${props.test.unique_id}/${props.test.questions[0].id}/edit`
            }}
          >
            View Details
          </Button>
          <Button
            variant="outline-primary"
            style={{
              borderRadius: "20px",
              margin: "1%",
            }}
            onClick={handleRemoveItem}
          >
            Delete Test
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">{props.time}</Card.Footer>
      </Card>
    </Col>
  );
}

export default TestCreated;
