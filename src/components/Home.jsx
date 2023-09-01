import { Container, Row, Col, Button } from "react-bootstrap";

const Home = (props) => {
  return (
    <>
      <Container>
        <Row style={{backgroundColor: "white", marginLeft: "-24px", marginRight: "-24px"}}>
          <Col className="h1" style={{ fontWeight: "bolder" }}>
            <img src="/ontheboat-logo.png" alt="On the Boat"></img>
          </Col>
        </Row>
        <Row style={{ background: "rgba(255,255,255,0.7)" }}>
          <Col>
            <p>
              Going out on your boat? You're in the right place.
            </p>
            <p>
              Using a QR code that is unique for your boat, crew can scan the
              code to quickly sign on to being on the boat. Once the boat is on
              the water, you can mark it as being on the water.
            </p>
            <p>
              Own a boat? Sign up as a crew member. As a crew member, you can be
              the owner of a boat.
            </p>
            <p>
              <Button href="/signUp">Get me onboard!</Button>
            </p>
            <p>
              As a boat owner, you can update your boat details and manage which
              crew are onboard.
            </p>
            <p>
              Your boat has a home. Set the location(s) for your boat and you
              will be able to take part in races and activities there.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
