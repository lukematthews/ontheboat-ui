import { Container, Row, Col } from "react-bootstrap";
import Onboard from "./Onboard";
import OwnedBoats from "./OwnedBoats";
import { useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
export const BoatProfile = (props) => {
  const profile = useSelector((state) => state.user);
  const {
    isAuthenticated,
  } = useAuth0();

  const [selectedBoat, setSelectedBoat] = useState(
    isAuthenticated && profile.value.ownedBoats.length > 0
      ? profile.value.ownedBoats[0]
      : {}
  );

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="h2">My Boats</div>
            <OwnedBoats callback={setSelectedBoat}></OwnedBoats>
            <div className="h2">Onboard today</div>
            <Onboard
              boatId={selectedBoat.id}
              day={dayjs().format("YYYY-MM-DD")}
            >
              {(onboard) => <div key={onboard.uuid}>{onboard.name}</div>}
            </Onboard>
            <div className="h2">Regulars</div>
            <Onboard boatId={selectedBoat.id}>
              {(onboard) => <div key={onboard.uuid}>{onboard.name}</div>}
            </Onboard>
          </Col>
        </Row>
      </Container>
    </>
  );
};
