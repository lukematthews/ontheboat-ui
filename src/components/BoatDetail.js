import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QRCode from "react-qr-code";
import { Button, Card, Accordion, Form } from "react-bootstrap";
import { useState } from "react";
import { Paper } from "@mui/material";
import { grey } from "@mui/material/colors";
import Handicaps from "./Handicaps";
import { useSelector } from "react-redux";
import { RequestOwnershipChange } from "./RequestOwnershipChange";

const BoatDetail = (props) => {
  const profile = useSelector((state) => state.user);

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
                      details={boatDetails}
                      editable={props.editable}
                    />
                  </Col>
                </Row>
                <Row>
                  <Field
                    name="Design"
                    field="design"
                    boatDetails={boatDetails}
                    props={props}
                  ></Field>
                  <Field
                    name="Colour"
                    field="hullColour"
                    boatDetails={boatDetails}
                    props={props}
                  ></Field>
                </Row>
                <Row className="mt-0">
                  <Field
                    name="Hull Material"
                    field="hullMaterial"
                    boatDetails={boatDetails}
                    props={props}
                  ></Field>
                  <Field
                    name="Length"
                    field="lengthOverall"
                    boatDetails={boatDetails}
                    props={props}
                  ></Field>
                </Row>
                <Row className="mt-0">
                  <Field
                    name="Rig"
                    field="rig"
                    boatDetails={boatDetails}
                    props={props}
                  ></Field>
                  <Field
                    name="Launch Year"
                    field="launchYear"
                    boatDetails={boatDetails}
                    props={props}
                  ></Field>
                </Row>
                <Row className="mt-0">
                  <Field
                    name="Contact"
                    field="contact"
                    boatDetails={boatDetails}
                    props={props}
                  ></Field>
                  <div className="py-2 col-xs-12 col-lg-6">
                    {props.editable && (
                      <RequestOwnershipChange
                        boatDetails={boatDetails}
                      ></RequestOwnershipChange>
                    )}
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

const Field = ({ boatDetails, name, field, props }) => {
  let fieldClass = props.editable ? "" : "form-control-plaintext";
  let fieldStyle = props.editable
    ? {}
    : { backgroundColor: "unset", opacity: "unset" };
  return (
    <>
      <div className="col-xs-12 col-lg-3 my-1">
        <Form.Label column className="fw-bold">
          {name}
        </Form.Label>
      </div>
      <div className="col-xs-12 col-lg-3 my-1">
        <Form.Control
          type="text"
          disabled={!props.editable}
          defaultValue={boatDetails[field]}
          onChange={(e) => {
            boatDetails[field] = e.target.value;
          }}
          style={fieldStyle}
          className={fieldClass}
        ></Form.Control>
      </div>
    </>
  );
};

const Bio = (props) => {
  let fieldClass = "form-control ";
  let style = {};
  if (!props.editable) {
    fieldClass = fieldClass + "form-control-plaintext";
    style = { backgroundColor: "unset", opacity: "unset" };
  }
  return (
    <>
      <Form.Label className="fw-bold form-label col-form-label">Bio</Form.Label>
      <textarea
        className={fieldClass}
        type="text"
        defaultValue={props.details.bio}
        rows={5}
        disabled={!props.editable}
        style={style}
      />
    </>
  );
};

export default BoatDetail;
