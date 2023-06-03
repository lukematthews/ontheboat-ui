import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import OwnedBoats from "./OwnedBoats";
import { ProfileHome } from "./ProfileHome";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";

const CrewHome = (props) => {
  const profile = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("1");

  if (!profile.isLoggedIn || !profile.value) {
    return <></>;
  }

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
              <div className="h1" style={{paddingRight: "30px"}}>{profile.value.firstName}</div>
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
            <div className="h2">My Boats</div>
            <OwnedBoats></OwnedBoats>
          </Col>
          <Col>
            <div className="h2">Stats</div>
            <div className="h3">Number of times:</div>
            <div className="h3">Total amount of time:</div>
            <div className="h3">Results</div>
          </Col>
        </Row>
        <Row style={displayTab("1")}>
          <ProfileHome></ProfileHome>
        </Row>
      </Container>
    </>
  );
};

export default CrewHome;
