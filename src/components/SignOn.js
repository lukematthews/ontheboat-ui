import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import BoatSearch from "./BoatSearch";
import { useSelector } from "react-redux";

function SignOn() {
  let [boatId] = useSearchParams();
  let boatIdValue = boatId.get("id");
  const [loading, setLoading] = useState("Loading");

  const [boat, setBoatDetails] = useState({});
  const selectedBoat = useSelector((state) => state.selectedBoat);
  boatIdValue =
    !boatIdValue || boatIdValue === null ? selectedBoat.value.id : boatIdValue;
  const [crewRequest, setCrewRequest] = useState({
    boatId: boatIdValue,
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    rememberMe: true,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("/api/sign-on", {
      method: "POST",
      body: JSON.stringify(crewRequest),
      headers: { "Content-Type": "application/json" },
    });
  };

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
          <Form
            autoComplete="on"
            action="/api/sign-on"
            method="post"
            onSubmit={handleSubmit}
          >
            <Form.Control
              type="text"
              style={{ display: "none" }}
              value={boatIdValue}
              readOnly
            ></Form.Control>
            <Form.Group controlId="firstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                autoComplete="first-name"
                onChange={(e) => {
                  crewRequest.firstName = e.target.value;
                  setCrewRequest(crewRequest);
                }}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                autoComplete="family-name"
                onChange={(e) => {
                  crewRequest.lastName = e.target.value;
                  setCrewRequest(crewRequest);
                }}
              />
            </Form.Group>
            <Form.Group controlId="mobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile"
                autoComplete="tel"
                onChange={(e) => {
                  crewRequest.mobile = e.target.value;
                  setCrewRequest(crewRequest);
                }}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                autoComplete="email"
                onChange={(e) => {
                  crewRequest.email = e.target.value;
                  setCrewRequest(crewRequest);
                }}
              />
            </Form.Group>
            <Form.Group controlId="duration">
              <Form.Select
                type="select"
                label="How long?"
                onChange={(e) => {
                  crewRequest.rememberMe = e.target.checked;
                  setCrewRequest(crewRequest);
                }}
              >
                <option>Today</option>
                <option>For the race</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="rememberMe">
              <Form.Check
                type="checkbox"
                label="Remember me"
                onChange={(e) => {
                  crewRequest.rememberMe = e.target.checked;
                  setCrewRequest(crewRequest);
                }}
              />
            </Form.Group>
            <div className="mb-3"></div>
            <Form.Group>
              <Button variant="primary" size="lg" type="submit">
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
