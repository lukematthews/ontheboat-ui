import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import BoatSearch from "./BoatSearch";
import { useSelector, useDispatch } from "react-redux";
import { Cookies, useCookies } from "react-cookie";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { setSelectedBoat } from "../features/selectedBoatSlice";

function SignOn() {
  let [boatId] = useSearchParams();
  let boatIdValue;
  const [loading, setLoading] = useState("Loading");
  const dispatch = useDispatch();
  const selectedBoat = useSelector((state) => state.selectedBoat);
  const profile = useSelector((state) => state.user);
  const [cookies, setCookie, removeCookie] = useCookies([
    "otb",
    "lastBoatOnboard",
    "lastCrew",
  ]);

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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [duration, setDuration] = useState(dayjs());
  const [rememberMe, setRememberMe] = useState(false);
  const [detailsChanged, setDetailsChanged] = useState(false);

  const toJson = () => {
    let uuid = detailsChanged === true ? null : profile.value.uuid;

    return JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      email: email,
      rememberMe: rememberMe,
      duration: duration,
      boatId: boatIdValue,
      uuid: uuid,
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
    const response = await fetch(
      `/api/marina/boat-details?boatId=${boatIdValue}`
    );
    const data = await response.json();
    dispatch(setSelectedBoat(Object.assign({}, data)));
    setLoading("");
  };

  useEffect(() => {
    if (cookies.lastBoatOnboard) {
      boatIdValue = cookies.lastBoatOnboard;
    }

    if (cookies.lastCrew) {
      loadCrew(cookies.lastCrew);
    } else if (profile.isLoggedIn === true) {
      loadCrew(profile.value.uuid);
    }
    if (boatIdValue && loading !== "") {
      loadBoat();
    }
  }, [boatIdValue, loading, selectedBoat.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let signOnRequest = toJson();
    let res = await fetch("/api/crew/sign-on", {
      method: "POST",
      body: signOnRequest,
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(response);
      response.json()
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
    return (<>
      <div>
        <span className="h1">{selectedBoat.value.boatName}</span>{" "}
        <span className="h3">{selectedBoat.value.sailNumber}</span>
      </div>
      <div>
        <BoatSearch var="link"></BoatSearch>
      </div></>
    );
  };

  const noBoat = () => {
    return (
      <>
        <div>
          <h1>Sign On</h1>
          <p>Use this page to sign yourself as being on board a boat.</p>
          <p>
            <BoatSearch var="button"></BoatSearch>
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
              value={selectedBoat.id}
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
                  setDetailsChanged(true);
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
                  setDetailsChanged(true);
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
                  setDetailsChanged(true);
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
                  setDetailsChanged(true);
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="duration">
              <Form.Label>When?</Form.Label>
              <div>
                <DatePicker
                  defaultValue={dayjs()}
                  slotProps={{ textField: { size: "small" } }}
                  value={duration}
                  onChange={(e) => setDuration(e)}
                  className="form-control"
                />
              </div>
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
