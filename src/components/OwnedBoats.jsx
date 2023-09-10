import { useNavigate } from "react-router-dom";
import "../style/OwnedBoats.css";
import { ListGroup } from "react-bootstrap";
import { useProfile } from "../common/Profile";
import { useSelector } from "react-redux";
import { Card, Container, Row, Col} from "react-bootstrap";
const Boat = (props) => {
  const navigate = useNavigate();

  return (
    <ListGroup.Item
      action
      className="boat-row"
      onClick={(e) => navigate(`/boat-detail?boatId=${props.boat.externalId}`)}
      key={"#boat-" + props.boat.id}
      active={true}
    ></ListGroup.Item>
  );
};

const OwnedBoats = (props) => {
  const profile = useSelector((state) => state.profile);

  if (profile.value.ownedBoats) {
    return (
      <ListGroup
        defaultActiveKey={
          "#boat-" + profile.value.ownedBoats.length > 0
            ? profile.value.ownedBoats[0].id
            : ""
        }
      >
        {profile.value.ownedBoats.map((boat) => (
          <Card key={boat.id}>
            <Card.Body>
              <Container>
                <Row bsPrefix="row justify-content-end">
                  <Col bsPrefix="col">
                    <span>{boat.boatName}</span>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        ))}
      </ListGroup>
    );
  } else {
    return (
      <>
        <p>
          You don't own any boats yet. If your boat is in the boat register,
          lodge an ownership change request and will be approved by the current
          owner or our site administrators
        </p>
      </>
    );
  }
};

export default OwnedBoats;
