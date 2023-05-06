import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import BoatSearch from "./BoatSearch";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

function SignOn() {
  let [boatId] = useSearchParams();
  let boatIdValue;
  const [loading, setLoading] = useState("Loading");
  const [boat, setBoatDetails] = useState({});
  const [cookies, setCookie] = useCookies(["boatweb"]);
  const selectedBoat = useSelector((state) => state.selectedBoat);

  // has a boat id been passed in via the props? use that.
  // is there a boat in redux? use that.
  // is there a boat in the cookies? use that.
  // otherwise. No boat!
  if (boatId.get("id")) {
    boatIdValue = boatId.get("id");
  } else if (selectedBoat.value.id) {
    boatIdValue = selectedBoat.value.id;
  } else if (cookies.lastBoatOnboard) {
    boatIdValue = cookies.lastBoatOnboard;
  }

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
    setBoatDetails(data);
    setLoading("");
  };

  useEffect(() => {
    if (cookies.lastBoatOnboard) {
      boatIdValue = cookies.lastBoatOnboard;
    }

    if (cookies.crewUUID) {
      loadCrew(cookies.crewUUID);
    }
    if (boatIdValue && loading !== "") {
      loadBoat();
    }
  }, [boatIdValue, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    crewRequest.boatId = boatIdValue;
    let res = await fetch("/api/sign-on", {
      method: "POST",
      body: JSON.stringify(crewRequest),
      headers: { "Content-Type": "application/json" },
    });
  };

  const loadCrew = async (crewId) => {
    let res = await fetch(`/api/find-by-id?uuid=${crewId}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setCrewRequest(data));
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
          <Form autoComplete="on" onSubmit={handleSubmit}>
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
                value={crewRequest.firstName}
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
                value={crewRequest.lastName}
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
                value={crewRequest.mobile}
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
                value={crewRequest.email}
                onChange={(e) => {
                  crewRequest.email = e.target.value;
                  setCrewRequest(crewRequest);
                }}
              />
            </Form.Group>
            <Form.Group controlId="duration">
              <Form.Label>How long?</Form.Label>
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
                value={crewRequest.rememberMe}
                onChange={(e) => {
                  crewRequest.rememberMe = e.target.checked;
                  setCrewRequest(crewRequest);
                }}
              />
            </Form.Group>
            <div className="mb-3"></div>
            <Form.Group>
              <Button variant="primary" size="lg" type="submit">
                I'm Onboard
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignOn;
