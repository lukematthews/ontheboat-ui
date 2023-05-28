import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BoatDetail from "./BoatDetail";
import { useNavigate } from "react-router-dom";

const BoatDetailDialog = (props) => {
  const profile = useSelector((state) => state.user);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  let loggedIn = profile.value.id ? true : false;

  let boatDetails = props.boat && props.boat.boatDetails;
  // if (boatDetails) {
  // boatDetails.contact = props.boat.contact;
  // }

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
                  <EditButton loggedIn={loggedIn}></EditButton>
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
  let message = props.loggedIn
    ? "Edit the details of this boat"
    : "Login to be able to edit boat details of boats you own";
  let style = props.loggedIn ? {} : { pointerEvents: "none" };
  return (
    <OverlayTrigger
      overlay={<Tooltip id="tooltip-disabled">{message}</Tooltip>}
    >
      <span className="d-inline-block">
        <Button
          disabled={!props.loggedIn}
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
