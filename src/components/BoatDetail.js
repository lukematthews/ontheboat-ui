import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QRCode from "react-qr-code";
import {
  Button,
  Card,
  Accordion,
  Form,
} from "react-bootstrap";
import { useState } from "react";
import { Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import Handicaps from "./Handicaps";
import { useSelector } from "react-redux";
import { RequestOwnershipChange } from "./RequestOwnershipChange";

const BoatDetail = (props) => {
  const profile = useSelector((state) => state.user);
  const [show, setShow] = useState(false);

  let boatDetails = { ...(props.boat && props.boat.boatDetails) };
  if (boatDetails) {
    boatDetails.contact = props.boat.contact;
  }
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
                    <Bio
                      loggedIn={profile.value.id ? true : false}
                      details={boatDetails}
                    />
                  </Col>
                </Row>
                <Row>
                  <Field
                    name="Design"
                    field="design"
                    boatDetails={boatDetails}
                    loggedIn={profile.value.id ? true : false}
                  ></Field>
                  <Field
                    name="Colour"
                    field="hullColour"
                    boatDetails={boatDetails}
                    loggedIn={profile.value.id ? true : false}
                  ></Field>
                </Row>
                <Row className="mt-0">
                  <Field
                    name="Hull Material"
                    field="hullMaterial"
                    boatDetails={boatDetails}
                    loggedIn={profile.value.id ? true : false}
                  ></Field>
                  <Field
                    name="Length"
                    field="lengthOverall"
                    boatDetails={boatDetails}
                    loggedIn={profile.value.id ? true : false}
                  ></Field>
                </Row>
                <Row className="mt-0">
                  <Field
                    name="Rig"
                    field="rig"
                    boatDetails={boatDetails}
                    loggedIn={profile.value.id ? true : false}
                  ></Field>
                  <Field
                    name="Launch Year"
                    field="launchYear"
                    boatDetails={boatDetails}
                    loggedIn={profile.value.id ? true : false}
                  ></Field>
                </Row>
                <Row className="mt-0">
                  <Field
                    name="Contact"
                    field="contact"
                    boatDetails={boatDetails}
                    loggedIn={profile.value.id ? true : false}
                  ></Field>
                  <div className="col-xs-12 col-lg-6">
                    {props.editable && <RequestOwnershipChange boatDetails={boatDetails}></RequestOwnershipChange>}
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

const Field = ({ loggedIn, boatDetails, name, field }) => {
  // field
  // let fieldClass = field ? "px-1 mb-1 border rounded-1" : "";
  let fieldClass = loggedIn ? "" : "form-control-plaintext";

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
          disabled={!loggedIn}
          defaultValue={boatDetails[field]}
          onChange={(e) => {
            boatDetails[field] = e.target.value;
          }}
          style={{ backgroundColor: "unset", opacity: "unset" }}
          className={fieldClass}
        ></Form.Control>
      </div>
    </>
  );
};

const ParsedText = ({ boatId, children }) => {
  if (!children) {
    return (
      <span key={`bio-${boatId}-0`}>
        <br />
      </span>
    );
  }
  return children.split("\n").map((line, index) => (
    <span key={`bio-${boatId}-${index}`}>
      {line}
      <br />
    </span>
  ));
};

const Bio = (props) => {
  if (props.loggedIn) {
    return (
      <>
        <Form.Label className="fw-bold form-label col-form-label">
          Bio
        </Form.Label>
        <textarea
          className="form-control"
          type="text"
          defaultValue={props.details.bio}
          rows={5}
        />
      </>
    );
  }
  return (
    <p>
      <ParsedText boatId={props.details.id}>{props.details.bio}</ParsedText>
    </p>
  );
};

export default BoatDetail;
