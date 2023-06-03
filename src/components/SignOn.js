import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import BoatSearch from "./BoatSearch";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

function SignOn() {
  let [boatId] = useSearchParams();
  let boatIdValue;
  const [loading, setLoading] = useState("Loading");
  const [boat, setBoatDetails] = useState({name: '', sailNumber: '', id: ''});
  const selectedBoat = useSelector((state) => state.selectedBoat);
  const profile = useSelector(state => state.user);

  // has a boat id been passed in via the props? use that.
  // is there a boat in redux? use that.
  // is there a boat in the cookies? use that.
  // otherwise. No boat!
  if (boatId.get("id")) {
    boatIdValue = boatId.get("id");
  } else if (selectedBoat.value.id) {
    boatIdValue = selectedBoat.value.id;
  } else if (Cookies.get("lastBoatOnboard")) {
    boatIdValue = Cookies.get("lastBoatOnboard");
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const toJson = () => {
    return JSON.stringify({
      "firstName": firstName,
      "lastName": lastName,
      "mobile": mobile,
      "email": email,
      "rememberMe": rememberMe,
      "boatId": boatIdValue,
      "uuid": "none",
    });
  };

  const loadCrewData = (data) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setMobile(data.mobile);
    setEmail(data.email);
    setRememberMe(data.rememberMe);
  };

  const loadBoat = async () => {
    const response = await fetch(`/api/marina/boat-details?boatId=${boatIdValue}`);
    const data = await response.json();
    setBoatDetails(data);
    setLoading("");
  };

  useEffect(() => {
    if (Cookies.get("lastBoatOnboard")) {
      boatIdValue = Cookies.get("lastBoatOnboard");
    }

    if (Cookies.get("crewUUID")) {
      loadCrew(Cookies.get("crewUUID"));
    }
    if (boatIdValue && loading !== "") {
      loadBoat();
    }
  }, [boatIdValue, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("/api/crew/sign-on", {
      method: "POST",
      body: toJson(),
      headers: { "Content-Type": "application/json" },
    });
  };

  const loadCrew = async (crewId) => {
    let res = await fetch(`/api/crew/find-by-id?uuid=${crewId}`, {
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => loadCrewData(data));
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
              value={boat.id}
              readOnly
            ></Form.Control>
            <Form.Group controlId="firstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                autoComplete="first-name"
                value={firstName}
                onChange={(e) => {
                  // crewRequest.firstName = e.target.value;
                  // setCrewRequest(crewRequest);
                  setFirstName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="mobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile"
                autoComplete="tel"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="duration">
              <Form.Label>How long?</Form.Label>
              <Form.Select
                type="select"
                label="How long?"
                onChange={(e) => {
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
                value={rememberMe}
                onChange={(e) => {
                  setRememberMe(e.target.checked);
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
