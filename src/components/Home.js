import { Container, Row, Col } from "react-bootstrap";

const Home = (props) => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Boat Tools</h1>
            <p>
              This tool allows you to register who is currently on your boat
              once you're on the water
            </p>
            <p>
              Using a QR code that is unique for your boat, crew can scan the
              code to quickly sign on to being on the boat. Once the boat is on
              the water, you can mark it as being on the water.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
