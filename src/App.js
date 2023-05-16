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

function App() {
  return (
    <Router>
      <Navbar fixed="top" bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand href="/">Boat Tools</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item href="/boats">
                <Link role="button" to="/boats" className="nav-link active">
                  Boat register
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
      <Container className="mt-6" style={{ marginTop: "100px" }}>
        <Row>
          <Col>
            <div className="App">
              <Routes>
                <Route path="/boats" element={<Boats />}></Route>
                <Route path="/" element={<Home />}></Route>
                <Route path="/signOn" element={<SignOn />}></Route>
                <Route path="/print" element={<Print />}></Route>
                <Route path="/signUp" element={<SignUp />}></Route>
                <Route path="/login" element={<Login/>}></Route>
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
    </Router>
  );
}

export default App;
