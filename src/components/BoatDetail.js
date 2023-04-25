import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QRCode from "react-qr-code";
import { Accordion, Button, Card } from "react-bootstrap";

const BoatDetail = (boat) => {
  let boatDetails = boat.boat && boat.boat.boatDetails;

  const field = (name, field) => {
    // field
    let fieldClass = field ? "border rounded-1" : "";

    return (
      <>
        <Col>
          <span className="fw-bold ">{name}</span>
        </Col>
        <Col className={fieldClass + " "}>
          <span>{boatDetails[field]}</span>
        </Col>
      </>
    );
  };

  return (
    <>
      {boatDetails && (
        <Container>
          <Row>
            <Col>
              <Accordion>
                <Accordion.Item>
                  <Accordion.Header>Sign on</Accordion.Header>
                  <Accordion.Body>
                    <Container>
                      <Row>
                        <Col>
                          <QRCode
                            value={
                              process.env.REACT_APP_EXTERNAL_IP +
                              "/signOn?id=" +
                              boat.boat.id
                            }
                          />
                        </Col>
                        <Col>
                          <div>
                            Use this QR code to scan it from a mobile and sign
                            crew onto the boat.
                          </div>
                          <div className="mt-2" style={{width: "100%"}}>
                            <Button style={{width: "100%"}} href={"/signOn?id="+boat.boat.id}>Sign On to {boatDetails.boatName}</Button>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Card bg="light">
                <Card.Header>
                  <Card.Title>
                    <span className="h1">{boatDetails.boatName}</span>{" "}
                    <span className="h3">{boat.boat.sailNumber}</span>
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Img
                    variant="top"
                    onError={(e) => (e.target.src = "")}
                    src={"/api/boat-photo?id=" + boat.boat.id}
                  ></Card.Img>
                  <Container>
                    <Row>
                      <Col>
                        <span>{boatDetails.bio}</span>
                      </Col>
                    </Row>
                    <Row>
                      {field("Design", "design")}
                      {field("Colour", "hullColour")}
                    </Row>
                    <Row className="mt-2">
                      {field("Hull Material", "hullMaterial")}
                      {field("Length Overall", "lengthOverall")}
                    </Row>
                    <Row className="mt-2">
                      {field("Rig", "rig")}
                      {field("Launch Year", "launchYear")}
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default BoatDetail;
