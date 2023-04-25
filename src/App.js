import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Boats from "./components/Boats";
import SignOn from "./components/SignOn";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

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
                <Nav.Link>
                  <Link to="/boats" className="nav-link active">
                    Boat register
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <Link to="/signOn" className="nav-link">Sign On</Link>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <Container className="mt-6" style={{marginTop: "100px"}}>
        <Row>
          <Col>
            <div className="App">
              <Routes>
                <Route path="/boats" element={<Boats />}></Route>
                <Route path="/signOn" element={<SignOn />}></Route>
              </Routes>
            </div>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
