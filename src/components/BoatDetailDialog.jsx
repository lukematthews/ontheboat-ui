import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState, useEffect } from "react";
import BoatDetail from "./BoatDetail";
import { useNavigate } from "react-router-dom";
import { ownsBoat } from "../common/Utils";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

const BoatDetailDialog = (props) => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const {
    isAuthenticated,
  } = useAuth0();

  let boatDetails = props.boat && props.boat.boatDetails;

  useEffect(() => {
    setShow(true);
  }, [props.boat]);


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
                  <BoatDetail boat={props.boat}></BoatDetail>
                </Modal.Body>
                <Modal.Footer>
                  <EditButton loggedIn={isAuthenticated} boat={props.boat}></EditButton>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

const EditButton = (props) => {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);

  let crewOwnsBoat = ownsBoat(profile.value, props.boat);

  let message = crewOwnsBoat
    ? "Edit the details of this boat"
    : "Login to be able to edit boat details of boats that you own";
  let style = crewOwnsBoat ? {} : { pointerEvents: "none" };
  return (
    <OverlayTrigger
      overlay={<Tooltip id="tooltip-disabled">{message}</Tooltip>}
    >
      <span className="d-inline-block">
        <Button
          disabled={!crewOwnsBoat}
          style={style}
          onClick={() => {
            navigate("/boat-detail");
          }}
        >
          Edit
        </Button>
      </span>
    </OverlayTrigger>
  );
};

export default BoatDetailDialog;
