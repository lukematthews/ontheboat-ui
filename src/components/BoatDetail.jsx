import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QRCode from "react-qr-code";
import { Button, Accordion, Modal } from "react-bootstrap";
import { Paper } from "@mui/material";
import Handicaps from "./Handicaps";
import { RequestOwnershipChange } from "./RequestOwnershipChange";
import { FormField, ModelField } from "../common/Utils";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Form } from "react-final-form";
import Loading from "./Loading";
import ContactField from "./ContactField";
import Bio from "./Bio";
import { ownsBoat, apiCall } from "../common/Utils";
import { useSelector } from "react-redux";

const BoatDetail = ({ boat, editable, save, dialogMode }) => {
  const profile = useSelector((state) => state.profile);

  let boatDetails = { ...(boat && boat.boatDetails) };
  if (Object.keys(boat).length > 0) {
    boatDetails.id = boat.id;
    boatDetails.sailNumber = boat.sailNumber;
    boatDetails.boatName = boat.boatName;
    boatDetails.bio = boat.boatDetails?.bio;
    boatDetails.design = boat.design;
    boatDetails.hullColour = boat.boatDetails?.hullColour;
    boatDetails.hullMaterial = boat.boatDetails?.hullMaterial;
    boatDetails.launchYear = boat.boatDetails?.launchYear;
    boatDetails.lengthOverall = boat.boatDetails?.lengthOverall;
    boatDetails.rig = boat.boatDetails?.rig;
    boatDetails.owners = boat.owners;
  } else {
    return <Loading></Loading>;
  }

  const media = [];
  if (boat?.boatMedia) {
    boat.boatMedia.map((boatMedia) => {
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
              value={import.meta.env.VITE_EXTERNAL_IP + "/signOn?id=" + boat.id}
            />
          </div>
        </div>
      </>
    );
  };
  media.push({ renderItem: qrCode });

  return (
    <Form
      onSubmit={save}
      initialValues={boatDetails}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton={dialogMode}>
            <Modal.Title className="w-100">
              <p style={{ textAlign: "center" }}>
                <span className="h1">{boatDetails.boatName}</span>{" "}
                <span className="h3">{boat.sailNumber}</span>
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                        <Bio details={boatDetails} editable={editable} />
                      </Col>
                    </Row>
                    <Row>
                      <FormField
                        label="Design"
                        field="design"
                        model={boatDetails}
                        editable={editable}
                      ></FormField>
                      <FormField
                        label="Colour"
                        field="hullColour"
                        model={boatDetails}
                        editable={editable}
                      ></FormField>
                    </Row>
                    <Row className="mt-0">
                      <FormField
                        label="Hull Material"
                        field="hullMaterial"
                        model={boatDetails}
                        editable={editable}
                      ></FormField>
                      <FormField
                        label="Length"
                        field="lengthOverall"
                        model={boatDetails}
                        editable={editable}
                      ></FormField>
                    </Row>
                    <Row className="mt-0">
                      <FormField
                        label="Rig"
                        field="rig"
                        model={boatDetails}
                        editable={editable}
                      ></FormField>
                      <FormField
                        label="Launch Year"
                        field="launchYear"
                        model={boatDetails}
                        editable={editable}
                      ></FormField>
                    </Row>
                    <Row className="mt-0">
                      <ContactField boat={boatDetails}></ContactField>
                      <div className="py-2 col-xs-12 col-lg-6">
                        <RequestOwnershipChange
                          boatDetails={boat}
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
                                        boat.id
                                      }
                                    />
                                  </Col>
                                  <Col>
                                    <div>
                                      Use this QR code to scan it from a mobile
                                      and sign crew onto the boat.
                                    </div>
                                    <div>
                                      <a href={`/print?id=${boat.id}`}>
                                        Printable copy
                                      </a>
                                    </div>
                                    <div
                                      className="mt-2"
                                      style={{ width: "100%" }}
                                    >
                                      <Button
                                        style={{ width: "100%" }}
                                        href={"/signOn?id=" + boat.id}
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
                              <Handicaps handicaps={boat.handicaps}></Handicaps>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            {ownsBoat(profile.value, boat) ? (
              <Row>
                <Col className="d-flex">
                  <div style={{ flex: "auto" }}></div>
                  <div>
                    <Button type="submit">Save</Button>{" "}
                    <Button>Cancel</Button>
                  </div>
                </Col>
              </Row>
            ) : (
              <></>
            )}
          </Modal.Footer>
        </form>
      )}
    />
  );
};

export default BoatDetail;
