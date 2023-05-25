import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QRCode from "react-qr-code";
import { Button, Card, Modal, Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";

const CrewHome = (props) => {
  const profile = useSelector((state) => state.user);

  const listBoats = () => {
    let view = <></>;
    if (profile.value.ownedBoats) {
        view = profile.value.ownedBoats.map(boat => {
            return <>
            <div>

            </div>
            </>
        });
    }
    return view;
  };
  if (!profile.value.id) {
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
            <div className="h2">Boats</div>
            {listBoats()}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CrewHome;
