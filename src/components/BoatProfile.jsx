import { Container, Row, Col } from "react-bootstrap";
import Onboard from "./Onboard";
import OwnedBoats from "./OwnedBoats";
import OwnerShipChangeRequests from "./OwnershipChangeRequests";
import { useState } from "react";
import dayjs from "dayjs";
import { useAuth0 } from "@auth0/auth0-react";
import { useProfile } from "../common/Profile";

export const BoatProfile = (props) => {

  const profile = useProfile();
  const {
    isAuthenticated,
  } = useAuth0();

  const [selectedBoat, setSelectedBoat] = useState(
    isAuthenticated && profile.ownedBoats?.length > 0
      ? profile.ownedBoats[0]
      : {}
  );

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="h2">My Boats</div>
            <OwnedBoats callback={setSelectedBoat}></OwnedBoats>
            <div className="h2">Ownership change requests</div>
            <OwnerShipChangeRequests></OwnerShipChangeRequests>
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
