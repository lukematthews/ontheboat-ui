import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import OwnedBoats from "./OwnedBoats";
import { ProfileHome } from "./ProfileHome";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import Onboard from "./Onboard";
import { BoatProfile } from "./BoatProfile";
// import { useAuth } from "react-oidc-context";

const CrewHome = (props) => {
  const profile = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("1");
  // const auth = useAuth();

  // if (!auth.isAuthenticated) {
  //   return <></>;
  // }

  const displayTab = (id) => {
    return { display: activeTab !== id ? "none" : "unset" };
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Nav
              variant="tabs"
              activeKey={activeTab}
              onSelect={(e) => {
                setActiveTab(e);
              }}
            >
              <div className="h1" style={{ paddingRight: "30px" }}>
                {profile.value.firstName}
              </div>
              <Nav.Item>
                <Nav.Link eventKey="1">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="2">Boats</Nav.Link>
              </Nav.Item>
              <Nav.Item></Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row style={displayTab("2")}>
          <Col>
          <BoatProfile></BoatProfile>
          </Col>
        </Row>
        <Row style={displayTab("1")}>
          <Col>
            <div className="h2">My Boats</div>
            <ProfileHome></ProfileHome>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CrewHome;
