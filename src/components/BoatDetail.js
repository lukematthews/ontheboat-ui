import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QRCode from "react-qr-code";
import { Button, Card, Modal, Accordion, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import Handicaps from "./Handicaps";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const BoatDetail = (props) => {
  const profile = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [requestType, setRequestType] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let boatDetails = { ...(props.boat && props.boat.boatDetails) };
  if (boatDetails) {
    boatDetails.contact = props.boat.contact;
  }

  useEffect(() => {
    // setShow(true);
  }, [props.boat]);

  const RequestOwnerChangeButton = () => {
    if (profile.value.id) {
      return (
        <Button onClick={() => changeOwner()}>Request Ownership Change</Button>
      );
    } else {
      return <Button disabled>Request Ownership Change</Button>;
    }
  };

  const changeOwner = () => {
    setShow(true);
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
        boatId: boatDetails.id,
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

  const RequestChange = () => {
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
                        value="other"
                        label="Allocate someone else"
                        onChange={(e) => setRequestType(e.target.value)}
                        name="ownershipType"
                      />
                      {/* We need to allow the user to specify who. They must be a crew member of the site. */}
                      <Form.Text id="boatId" style={{ display: "none" }}>
                        {boatDetails.id}
                      </Form.Text>
                    </p>
                    <p>
                      The current owners will contacted for approval and you
                      will be sent an email once completed.
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

  const Field = ({ name, field }) => {
    // field
    let fieldClass = field ? "px-1 mb-1 border rounded-1" : "";

    return (
      <>
        <div className="col-xs-12 col-lg-3">
          <Form.Label column className="fw-bold">
            {name}
          </Form.Label>
        </div>
        <div className="col-xs-12 col-lg-3">
          <Form.Control
            type="text"
            value={boatDetails[field] || "-"}
            disabled
            style={{ backgroundColor: "unset", opacity: "unset" }}
          ></Form.Control>
        </div>
      </>
    );
  };

  const ParsedText = ({ children }) => {
    if (!children) {
      return (
        <span key={`bio-${boatDetails.id}-0`}>
          <br />
        </span>
      );
    }
    return children.split("\n").map((line, index) => (
      <span key={`bio-${boatDetails.id}-${index}`}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <>
      {boatDetails && (
        <Container>
          <Row>
            <div className="col-xs-12 col-lg-6">
              <Paper
                elevation={6}
                sx={{ backgroundColor: grey[500], height: "100%" }}
              >
                <Card.Img
                  variant="top"
                  onError={(e) => (e.target.src = "")}
                  src={
                    props.boat.id &&
                    "/api/marina/boat-photo?id=" + props.boat.id
                  }
                ></Card.Img>
              </Paper>
            </div>
            <Col>
              <Container>
                <Row>
                  <Col>
                    <p>
                      <ParsedText>{boatDetails.bio}</ParsedText>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Field name="Design" field="desigin"></Field>
                  <Field name="Colour" field="hullColour"></Field>
                </Row>
                <Row className="mt-0">
                  <Field name="Hull Material" field="hullMaterial"></Field>
                  <Field name="Length" field="lengthOverall"></Field>
                </Row>
                <Row className="mt-0">
                  <Field name="Rig" field="rig"></Field>
                  <Field name="Launch Year" field="launchYear"></Field>
                </Row>
                <Row className="mt-0">
                  <Field name="Contact" field="contact"></Field>
                  <div className="col-xs-12 col-lg-6">
                    {props.editable && <RequestChange></RequestChange>}
                  </div>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col>
                    <Accordion flush>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Sign On</Accordion.Header>
                        <Accordion.Body>
                          <Container>
                            <Row>
                              <Col>
                                <QRCode
                                  value={
                                    process.env.REACT_APP_EXTERNAL_IP +
                                    "/signOn?id=" +
                                    props.boat.id
                                  }
                                />
                              </Col>
                              <Col>
                                <div>
                                  Use this QR code to scan it from a mobile and
                                  sign crew onto the boat.
                                </div>
                                <div>
                                  <a href={`/print?id=${props.boat.id}`}>
                                    Printable copy
                                  </a>
                                </div>
                                <div className="mt-2" style={{ width: "100%" }}>
                                  <Button
                                    style={{ width: "100%" }}
                                    href={"/signOn?id=" + props.boat.id}
                                  >
                                    Sign On to {boatDetails.boatName}
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </Container>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                </Row>
                <Row>
                  <Col className="pt-2">
                    <Accordion flush>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Handicaps</Accordion.Header>
                        <Accordion.Body>
                          <Handicaps
                            handicaps={props.boat.handicaps}
                          ></Handicaps>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default BoatDetail;
