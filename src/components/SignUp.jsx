import { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
const SignUp = (props) => {
  
  const dispatch = useDispatch();
  const [response, setResponse] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    console.log(e);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    };
    fetch("/api/auth/register", requestOptions)
      .then((response) => response.json())
      .then((data) => handleResponse(data));
  };

  const handleResponse = (response) => {
    handleShow();
    setResponse(response);
  };

  const renderResponse = () => {
    if (response.message === "User registered successfully!") {
      dispatch({type: "user", payload: response.crew})
      return (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="bg-success" closeButton>
              <Modal.Title>Welcome aboard</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>You're now part of the crew.</p>
              <p>
                Now that you're onboard you can own boats, join clubs and
                marinas and easily sign on
              </p>
              <p>
                Now is a good time to edit your details to add an emergency
                contact. By signing on to show that you're on a boat, if
                something happens your club or emergency services will be able
                to get in contact with them.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>Ok</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    } else {
      return (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="bg-danger" closeButton>
              <Modal.Title>Welcome aboard</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Something is not quite right</p>
              <p><ul>{response !== undefined && response.map(error => (<li>{error.message}</li>))}</ul></p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>Ok</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  };

  const formField = (props) => {
    return (
      <div>
        <label className="form-label">{props.label}</label>
        <Field
          component="input"
          name={props.field}
          autoComplete={props.autoComplete}
          type="text"
          placeholder={props.placeHolder}
          className="form-control"
        />
      </div>
    );
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div>
              <span className="h1">Join the crew</span>
              <p>
                Being part of the crew means that you can own boats, manage crew
                and track your boat going in and out on the water.
              </p>
              <>{renderResponse()}</>

              <Form
                onSubmit={handleSubmit}
                initialValues={{}}
                render={({
                  handleSubmit,
                  form,
                  submitting,
                  pristine,
                  crewRequest,
                }) => (
                  <form onSubmit={handleSubmit} action="POST">
                    <>
                      {formField({
                        autoComplete: "first-name",
                        label: "First Name",
                        placeHolder: "First Name",
                        field: "firstName",
                      })}
                      {formField({
                        autoComplete: "family-name",
                        label: "Last Name",
                        placeHolder: "Last Name",
                        field: "lastName",
                      })}
                      {formField({
                        autoComplete: "tel",
                        label: "Mobile",
                        placeHolder: "Mobile",
                        field: "mobile",
                      })}
                      {formField({
                        autoComplete: "email",
                        label: "Email",
                        placeHolder: "Email",
                        field: "email",
                      })}
                    </>
                    <div>
                      <label className="form-label">Password</label>
                      <Field
                        component="input"
                        name="password"
                        autoComplete="new-password"
                        type="password"
                        className="form-control"
                      />
                    </div>
                    <div className="mt-2">
                      <Button variant="primary" size="lg" type="submit">
                        I'm Onboard
                      </Button>
                    </div>
                  </form>
                )}
              ></Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
