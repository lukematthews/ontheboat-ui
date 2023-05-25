import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Boats from "./components/Boats";
import SignOn from "./components/SignOn";
import Home from "./components/Home";
import Print from "./components/Print";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import CookieConsent from "react-cookie-consent";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserMenu from "./components/UserMenu";
import CrewHome from "./components/CrewHome";
import Onboard from "./components/Onboard";
import BoatDetailPage from "./components/BoatDetailPage";

function App() {
  return (
    <Router>
      <div>
        <Navbar fixed="top" bg="secondary" variant="light">
          <div className="container-fluid">
            <Navbar.Brand href="/">
              <img
                src="/ontheboat-logo.png"
                alt="On the Boat"
                style={{ height: "40px" }}
              ></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Item href="/boats">
                  <Link role="button" to="/boats" className="nav-link active">
                    Boat Register
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link role="button" to="/signOn" className="nav-link">
                    Sign On
                  </Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
            <UserMenu></UserMenu>
          </div>
        </Navbar>
        <div
          style={{
            backgroundImage: "url(/ontheboat2.jpg)",
            backgroundSize: "cover",
            paddingTop: "10px"
          }}
        >
          <Container>
            <Row
              className="py-2"
              style={{ background: "rgba(255,255,255,0.95)" }}
            >
              <Col>
                <div className="App">
                  <Routes>
                    <Route path="/boats" element={<Boats />}></Route>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/signOn" element={<SignOn />}></Route>
                    <Route path="/print" element={<Print />}></Route>
                    <Route path="/signUp" element={<SignUp />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/crew" element={<CrewHome />}></Route>
                    <Route path="/onboard" element={<Onboard />}></Route>
                    <Route path="/boat-detail" element={<BoatDetailPage/>}></Route>
                  </Routes>
                </div>
              </Col>
            </Row>
            <Row>
              <CookieConsent
                location="bottom"
                buttonText="Accept"
                enableDeclineButton="true"
                flipButtons="true"
                declineButtonText="No"
                cookieName="cookiesEnabled"
                style={{ background: "green" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
              >
                This website uses cookies to help signing on to a boat easier.
              </CookieConsent>
            </Row>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
