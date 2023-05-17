import { Container, Row, Col, Button } from "react-bootstrap";

const Home = (props) => {

            // backgroundImage: 'url("/ontheboat2.jpg")',
            // backgroundSize: "cover",

  return (
    <>
      <div
        style={{
          marginBottom: "50px",
          marginTop: "-100px",
          height: "200px",
          marginRight: "-100px",
          marginLeft: "-100px",
          padding: "100px",
          color: "white",
        }}
      >
        <Col className="h1" style={{fontWeight: "bolder"}}>
          <span>On The Boat</span>
        </Col>
      </div>
      <Container style={{ background: "rgba(255,255,255,0.7)" }}>
        <Row>
          <Col>
            <p>
              This tool allows you to register who is currently on your boat
              once you're on the water
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
