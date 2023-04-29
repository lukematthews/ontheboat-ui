import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import BoatSearch from "./BoatSearch";
import { useSelector } from "react-redux";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";

function SignOn() {
  let [boatId] = useSearchParams();
  let boatIdValue = boatId.get("id");
  const [loading, setLoading] = useState("Loading");

  const [boat, setBoatDetails] = useState({});
  const selectedBoat = useSelector((state) => state.selectedBoat);
  boatIdValue =
    !boatIdValue || boatIdValue === null ? selectedBoat.value.id : boatIdValue;
  const loadBoat = async () => {
    const response = await fetch(`/api/boat-details?boatId=${boatIdValue}`);
    const data = await response.json();
    console.log(data);
    setBoatDetails(data);
    setLoading("");
  };

  useEffect(() => {
    if (boatIdValue && loading !== "") {
      loadBoat();
    }
  }, [boatIdValue, loading]);

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
          <p>
            <BoatSearch></BoatSearch>
          </p>
        </div>
        <div></div>
      </>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <div>{boatIdValue ? displayBoat() : noBoat()}</div>
        </Col>
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
