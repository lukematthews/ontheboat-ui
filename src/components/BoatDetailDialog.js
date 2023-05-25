import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  Button,
  Modal,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BoatDetail from "./BoatDetail";
import { useNavigate } from "react-router-dom";

const BoatDetailDialog = (props) => {
  const profile = useSelector((state) => state.user);
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

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
                  <BoatDetail boat={props.boat} ></BoatDetail>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => {navigate("/boat-detail")}}>Edit</Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default BoatDetailDialog;
