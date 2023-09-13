import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QRCode from "react-qr-code";
import { Button, Accordion, Modal, Toast } from "react-bootstrap";
import { Paper, Snackbar } from "@mui/material";
import Handicaps from "./Handicaps";
import { RequestOwnershipChange } from "./RequestOwnershipChange";
import { FormField } from "../common/Utils";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Form } from "react-final-form";
import Loading from "./Loading";
import ContactField from "./ContactField";
import Bio from "./Bio";
import { useSelector } from "react-redux";
import { useState } from "react";
import EditButton from "./EditButton";
import { Field } from "react-final-form";
import { apiCall } from "../common/Utils";
import { useAuth0 } from "@auth0/auth0-react";

const BoatDetail = ({ boat, editable, save, dialogMode }) => {
  const profile = useSelector((state) => state.profile);
  const [editMode, setEditMode] = useState(false);
  const [show, setShow] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

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

  const saveBoat = async (values) => {
    console.log(values);
    const getToken = async () => {
      await getAccessTokenSilently().then((token) => {
        apiCall({
          endpoint: "/boat/update-boat-details",
          body: values,
          jwt: token,
          method: "PUT",
          handlerCallback: (response) => {
            console.log("saved successfully");
            setShow(true);
            setEditMode(false);
          },
        });
      });
    };
    getToken();
  };

  return (
    <>
      <Snackbar
        open={show}
        autoHideDuration={3000}
        message="Saved Successfully"
        key="bottom center"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setShow(false);
        }}
      ></Snackbar>
      <Form
        onSubmit={saveBoat}
        initialValues={boatDetails}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Header closeButton={dialogMode}>
              <Modal.Title className="w-100">
                <p style={{ textAlign: "center" }}>
                  {editMode && editable ? (
                    <>
                      <Field
                        id={"form-input.boatName"}
                        component="input"
                        name="boatName"
                        type="text"
                        placeholder="Boat name"
                        className="form-control form-control-lg mb-2"
                      />
                      <Field
                        id={"form-input.sailNumber"}
                        component="input"
                        name="sailNumber"
                        type="text"
                        placeholder="Sail number"
                        className="h3 form-control"
                      />
                    </>
                  ) : (
                    <>
                      <span className="h1">{boatDetails.boatName}</span>{" "}
                      <span className="h3">{boat.sailNumber}</span>
                    </>
                  )}
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
                          <Bio
                            details={boatDetails}
                            editable={editMode && editable}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <FormField
                          label="Design"
                          field="design"
                          model={boatDetails}
                          disabled={!(editMode && editable)}
                        ></FormField>
                        <FormField
                          label="Colour"
                          field="hullColour"
                          model={boatDetails}
                          disabled={!(editMode && editable)}
                        ></FormField>
                      </Row>
                      <Row className="mt-0">
                        <FormField
                          label="Hull Material"
                          field="hullMaterial"
                          model={boatDetails}
                          disabled={!(editMode && editable)}
                        ></FormField>
                        <FormField
                          label="Length"
                          field="lengthOverall"
                          model={boatDetails}
                          disabled={!(editMode && editable)}
                        ></FormField>
                      </Row>
                      <Row className="mt-0">
                        <FormField
                          label="Rig"
                          field="rig"
                          model={boatDetails}
                          disabled={!(editMode && editable)}
                        ></FormField>
                        <FormField
                          label="Launch Year"
                          field="launchYear"
                          model={boatDetails}
                          disabled={!(editMode && editable)}
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
                                        Use this QR code to scan it from a
                                        mobile and sign crew onto the boat.
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
                                <Handicaps
                                  handicaps={boat.handicaps}
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
            </Modal.Body>
            <div
              style={{
                position: "fixed",
                bottom: "10px",
                right: "10%",
                zIndex: 1000,
              }}
            >
              {editMode && editable ? (
                <div style={{flexDirection: "column"}}>

                  <div className="mb-1" style={{ justifyContent: "center", display: "flex" }}>
                    <Button type="submit">Save</Button>
                  </div>
                  <div style={{ justifyContent: "center", display: "flex" }}>
                    <Button onClick={() => setEditMode(false)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div stlye={{display: "flex", justifyContent: "center"}}>
                  <EditButton
                    boat={boat}
                    editModeCallback={setEditMode}
                  ></EditButton>
                </div>
              )}
            </div>
          </form>
        )}
      />
    </>
  );
};

export default BoatDetail;
