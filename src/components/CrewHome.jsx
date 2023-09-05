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
import { useSelector } from "react-redux";
import { Admin } from "./Admin";

const CrewHome = (props) => {
  const loadedProfile = useProfile();
  const [activeTab, setActiveTab] = useState("1");
  const reduxProfile = useSelector((state) => state.profile);
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
                {reduxProfile.value.firstName}
              </div>
              <Nav.Item>
                <Nav.Link eventKey="1">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="2">Boats</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="3">Admin</Nav.Link>
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
        <Row style={displayTab("3")}>
          <Col>
            <Admin></Admin>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CrewHome;
