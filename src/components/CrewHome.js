import React, { useEffect } from "react";
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
import { useAuth0 } from "@auth0/auth0-react";
import { apiCall } from "../common/Utils";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";


const CrewHome = (props) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("1");

  const {
    user,
    isAuthenticated,
    getAccessTokenSilently 
  } = useAuth0();

  useEffect(() => {
    console.log(user.name);
    const getToken = async () => {
      await getAccessTokenSilently().then(token => {
        apiCall({endpoint: '/crew/profile', jwt: token, handlerCallback: (response)=> {
          dispatch(
            setUser({user: response})
          );
          console.log(response);
        }})
      });
    };
    getToken();
  }, [user]);


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
            <ProfileHome></ProfileHome>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CrewHome;
