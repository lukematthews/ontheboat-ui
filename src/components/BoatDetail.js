import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QRCode from "react-qr-code";
import { Button, Card, Modal, Accordion } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import Handicaps from "./Handicaps";
import { useSelector } from "react-redux";

const BoatDetail = (props) => {
  const profile = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let boatDetails = { ...(props.boat && props.boat.boatDetails) };
  if (boatDetails) {
    boatDetails.contact = props.boat.contact;
  }

  useEffect(() => {
    // setShow(true);
  }, [props.boat]);

  const requestOwnerChangeButton = () => {
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

  const requestChange = () => {
    return (
      <>
        {requestOwnerChangeButton()}
        <Modal show={show} onHide={handleClose}>
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
                    The current owners will contacted for approval and you will
                    be sent an email once completed.
                  </p>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button>Ok</Button>
            <Button>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const field = (name, field) => {
    // field
    let fieldClass = field ? "px-1 mb-1 border rounded-1" : "";

    return (
      <>
        <div className="col-xs-12 col-lg-3">
          <span className="fw-bold ">{name}</span>
        </div>
        <div className="col-xs-12 col-lg-3">
          <p className={fieldClass + " "}>
            <span>{boatDetails[field] || "-"}</span>
          </p>
        </div>
      </>
    );
  };

  const parseNewLines = (text) => {
    if (!text) {
      return (
        <span key={`bio-${boatDetails.id}-0`}>
          <br />
        </span>
      );
    }
    return text.split("\n").map((line, index) => (
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
                      <span>{parseNewLines(boatDetails.bio)}</span>
                    </p>
                  </Col>
                </Row>
                <Row>
                  {field("Design", "design")}
                  {field("Colour", "hullColour")}
                </Row>
                <Row className="mt-0">
                  {field("Hull Material", "hullMaterial")}
                  {field("Length", "lengthOverall")}
                </Row>
                <Row className="mt-0">
                  {field("Rig", "rig")}
                  {field("Launch Year", "launchYear")}
                </Row>
                <Row className="mt-0">
                  {field("Contact", "contact")}
                  <div className="col-xs-12 col-lg-6">
                    {props.editable && requestChange()}
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
