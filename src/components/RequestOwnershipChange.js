import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export const RequestOwnershipChange = (props) => {
  let boatDetails = props.boatDetails;
  const profile = useSelector((state) => state.user);
  const [requestType, setRequestType] = useState("sole");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeOwner = () => {
    setShow(true);
  };

  const RequestOwnerChangeButton = () => {
    if (profile.isLoggedIn) {
      return (
        <Button onClick={() => changeOwner()}>Request Ownership Change</Button>
      );
    } else {
      return <Button disabled>Request Ownership Change</Button>;
    }
  };

  const postOwnershipChange = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + Cookies.get("otb"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boatId: props.id,
        crewId: profile.value.id,
        requestType: requestType,
      }),
    };

    await fetch("/api/crew/request-ownership-change", requestOptions)
      .then((response) => response.text())
      .then((data) => () => {
        setShow(false);
      });
    setShow(false);
  };

  return (
    <>
      <RequestOwnerChangeButton></RequestOwnerChangeButton>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => postOwnershipChange(e)} method="POST">
          <Modal.Header closeButton>
            <Modal.Title>Request ownership change</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <p>
                    You're requesting to be added to the list of owners for{" "}
                    {boatDetails.boatName}
                  </p>
                  <p>
                    Would you like to
                    </p>
                    <Form.Check
                      id="ownership-choice-1"
                      type="radio"
                      label="Take sole ownership of the boat"
                      value="sole"
                      name="ownershipType"
                      onChange={(e) => setRequestType(e.target.value)}
                      defaultChecked
                    />
                    <Form.Check
                      id="ownership-choice-2"
                      type="radio"
                      value="partner"
                      label="Be added as an owner of the boat"
                      onChange={(e) => setRequestType(e.target.value)}
                      name="ownershipType"
                    />
                    <Form.Check
                      id="ownership-choice-3"
                      type="radio"
                      value="remove"
                      label="Remove myself as an owner"
                      onChange={(e) => setRequestType(e.target.value)}
                      name="ownershipType"
                    />
                    <Form.Check
                      id="ownership-choice-4"
                      type="radio"
                      value="other"
                      label="Allocate someone else"
                      onChange={(e) => setRequestType(e.target.value)}
                      name="ownershipType"
                    />
                    {/* We need to allow the user to specify who. They must be a crew member of the site. */}
                    <Form.Text id="boatId" style={{ display: "none" }}>
                      {boatDetails.id}
                    </Form.Text>
                  <p>
                    The current owners will contacted for approval and you will
                    be sent an email once completed.
                  </p>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Ok</Button>
            <Button onClick={() => handleClose()}>Cancel</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
