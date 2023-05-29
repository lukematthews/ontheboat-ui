import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QRCode from "react-qr-code";
import { Button, Card, Modal, Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
import OwnedBoats from "./OwnedBoats";

const CrewHome = (props) => {
  const profile = useSelector((state) => state.user);

  if (!profile.isLoggedIn) {
    return <></>;
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="h1">{profile.value.firstName}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="h2">My Boats</div>
            <OwnedBoats></OwnedBoats>
          </Col>
          <Col>
            <div className="h2">Stats</div>
            <div className="h3">Number of times:</div>
            <div className="h3">Total amount of time:</div>
            <div className="h3">Results</div>
          </Col>

        </Row>
      </Container>
    </>
  );
};

export default CrewHome;
