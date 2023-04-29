import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QRCode from "react-qr-code";
import { Button, Card, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import { grey } from '@mui/material/colors';

const BoatDetail = (props) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  let boatDetails = props.boat && props.boat.boatDetails;

  useEffect(() => {
    setShow(true);
  }, [props.boat]);

  const field = (name, field) => {
    // field
    let fieldClass = field ? "px-1 border rounded-1" : "";

    return (
      <>
        <Col>
          <span className="fw-bold ">{name}</span>
        </Col>
        <Col>
          <p className={fieldClass + " "}>
            <span>{boatDetails[field] || "-"}</span>
          </p>
        </Col>
      </>
    );
  };

  return (
    <>
      {boatDetails && (
        <Container>
          <Row>
            <Col>
              <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                  <Modal.Title className="w-100">
                    <p style={{ textAlign: "center" }}>
                      <span className="h1">{boatDetails.boatName}</span>{" "}
                      <span className="h3">{props.boat.sailNumber}</span>
                    </p>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container>
                    <Row>
                      <Col>
                        <Paper elevation={6} sx={{backgroundColor: grey[500], height: '100%'}}>
                          <Card.Img
                            variant="top"
                            onError={(e) => (e.target.src = "")}
                            src={"/api/boat-photo?id=" + props.boat.id}
                          ></Card.Img>
                        </Paper>
                      </Col>
                      <Col>
                        <Container>
                          <Row>
                            <Col>
                              <p>
                                <span>{boatDetails.bio}</span>
                              </p>
                            </Col>
                          </Row>
                          <Row>
                            {field("Design", "design")}
                            {field("Colour", "hullColour")}
                          </Row>
                          <Row className="mt-2">
                            {field("Hull Material", "hullMaterial")}
                            {field("Length", "lengthOverall")}
                          </Row>
                          <Row className="mt-2">
                            {field("Rig", "rig")}
                            {field("Launch Year", "launchYear")}
                          </Row>
                          <Row>
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
                                    Use this QR code to scan it from a mobile
                                    and sign crew onto the boat.
                                  </div>
                                  <div
                                    className="mt-2"
                                    style={{ width: "100%" }}
                                  >
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
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  </Container>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default BoatDetail;
