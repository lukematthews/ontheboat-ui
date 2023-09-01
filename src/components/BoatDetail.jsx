import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QRCode from "react-qr-code";
import { Button, Accordion, Form } from "react-bootstrap";
import { Paper } from "@mui/material";
import Handicaps from "./Handicaps";
import { RequestOwnershipChange } from "./RequestOwnershipChange";
import { ModelField } from "../common/Utils";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const BoatDetail = (props) => {
  let boatDetails = { ...(props.boat && props.boat.boatDetails) };
  if (boatDetails) {
    boatDetails.contact = props.boat.contact;
  }

  const media = [];
  if (props.boat?.boatMedia) {
    props.boat.boatMedia.map((boatMedia) => {
      media.push({ original: "/api/marina/boat-photo?id=" + boatMedia.id });
    });
  }

  let qrCode = () => {
    return (
      <>
        <div style={{ backgroundColor: "white" }}>
          <div>
            <QRCode
              size={256}
              value={
                import.meta.env.VITE_EXTERNAL_IP +
                "/signOn?id=" +
                props.boat.id
              }
            />
          </div>
        </div>
      </>
    );
  };
  media.push({ renderItem: qrCode });

  return (
    <>
      {boatDetails && (
        <Container>
          <Row>
            <div className="col-xs-12 col-lg-6">
              <Paper elevation={6}>
                <ImageGallery
                  showPlayButton={false}
                  items={media}
                ></ImageGallery>
              </Paper>
            </div>
            <Col>
              <Container>
                <Row>
                  <Col>
                    <Bio details={boatDetails} editable={props.editable} />
                  </Col>
                </Row>
                <Row>
                  <ModelField
                    name="Design"
                    field="design"
                    model={boatDetails}
                    props={props}
                  ></ModelField>
                  <ModelField
                    name="Colour"
                    field="hullColour"
                    model={boatDetails}
                    props={props}
                  ></ModelField>
                </Row>
                <Row className="mt-0">
                  <ModelField
                    name="Hull Material"
                    field="hullMaterial"
                    model={boatDetails}
                    props={props}
                  ></ModelField>
                  <ModelField
                    name="Length"
                    field="lengthOverall"
                    model={boatDetails}
                    props={props}
                  ></ModelField>
                </Row>
                <Row className="mt-0">
                  <ModelField
                    name="Rig"
                    field="rig"
                    model={boatDetails}
                    props={props}
                  ></ModelField>
                  <ModelField
                    name="Launch Year"
                    field="launchYear"
                    model={boatDetails}
                    props={props}
                  ></ModelField>
                </Row>
                <Row className="mt-0">
                  <ContactField
                    boatDetails={boatDetails}
                    props={props}
                  ></ContactField>
                  <div className="py-2 col-xs-12 col-lg-6">
                    <RequestOwnershipChange
                      boatDetails={boatDetails}
                    ></RequestOwnershipChange>
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
                                    import.meta.env.VITE_EXTERNAL_IP +
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

const ContactField = ({ boatDetails, props }) => {
  let fieldClass = "form-control-plaintext";
  let fieldStyle = { backgroundColor: "unset", opacity: "unset" };

  const renderOwnerNames = () => {
    if (!props.boat.owners) {
      return "";
    }
    return props.boat.owners
      .map((owner) =>
        `${format(owner.firstName)} ${format(owner.lastName)}`.trim()
      )
      .join(", ");
  };

  const format = (value) => {
    return value ? value : "";
  };

  return (
    <>
      <div className="col-xs-12 col-lg-3 my-1">
        <Form.Label column className="fw-bold">
          Owners
        </Form.Label>
      </div>
      <div className="col-xs-12 col-lg-3 my-1">
        <Form.Control
          type="text"
          disabled
          className={fieldClass}
          style={fieldStyle}
          defaultValue={renderOwnerNames()}
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
