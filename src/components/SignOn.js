import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import BoatSearch from "./BoatSearch";

function SignOn() {
  let [boatId, setBoat] = useSearchParams();
  let boatIdValue = boatId.get("id");
  const [boat, setBoatDetails] = useState({});
  console.log(boatIdValue);
  const loadBoat = async () => {
    const response = await fetch(`/api/boat-details?boatId=${boatIdValue}`);
    const data = await response.json();
    console.log(data);
    setBoatDetails(data);
  };

  useEffect(() => {
    if (boatIdValue) {
      loadBoat();
    }
  }, [boatIdValue]);

  const displayBoat = () => {
    return (
      <div>
        <span className="h1">{boat.boatName}</span>{" "}
        <span className="h3">{boat.sailNumber}</span>
      </div>
    );
  };

  const noBoat = () => {
    return (
      <>
        <div>
          <h1>Sign On</h1>
          <p>Use this page to sign yourself as being on board a boat.</p>
          <p><BoatSearch></BoatSearch></p>
        </div>
        <div></div>
      </>
    );
  };

  return (
    <Container>
      <Row>
        <Col>{boatIdValue ? displayBoat() : noBoat()}</Col>
      </Row>
      <Row>
        <Col>
          <Form autoComplete="on">
            <Form.Group controlId="formLastName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                autoComplete="first-name"
              />
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                autoComplete="family-name"
              />
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile"
                autoComplete="tel"
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                autoComplete="email"
              />
            </Form.Group>
            <div className="mb-3"></div>
            <Form.Group>
              <Button variant="primary" size="lg">
                Onboard
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignOn;
