import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OwnedBoats from "./OwnedBoats";
import { ProfileHome } from "./ProfileHome";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import Onboard from "./Onboard";
import { BoatProfile } from "./BoatProfile";
import SignUpWelcome from "./SignUpWelcome";
import { useProfile } from "../common/Profile";

const CrewHome = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const profile = useProfile();
  const displayTab = (id) => {
    return { display: activeTab !== id ? "none" : "unset" };
  };

  return (
    <>
      <Container>
        <Row>
          <Col className="mb-5">
            <SignUpWelcome></SignUpWelcome>
          </Col>
        </Row>
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
                {profile.firstName}
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
            <ProfileHome></ProfileHome>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CrewHome;
