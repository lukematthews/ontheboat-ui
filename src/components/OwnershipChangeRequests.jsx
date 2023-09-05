import { useEffect, useState } from "react";
import { apiCallAuth, apiCallPromise } from "../common/Utils";
import { useAuth0 } from "@auth0/auth0-react";
import { apiCall } from "../common/Utils";
import { Card, Container, Row, Col } from "react-bootstrap";

const OwnerShipChangeRequests = (props) => {
  const [requests, setRequests] = useState([]);
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently 
  } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently()
      .then(token => {
        apiCallPromise({endpoint: '/crew/ownership-requests', jwt: token})
          .then(response => setRequests(response));
      });
  }, [user]);

  return <>{
    requests.map(request => {
      return <OwnershipRequest request={request} key={request.boatName}></OwnershipRequest>;
    })
  }</>;
};

const OwnershipRequest = (props) => {
  const stateLabels = {
    SUBMITTED: {label: "Submitted", background: "bg-primary"},
    IN_PROGRESS: {label: "In progress", background: "bg-info"},
    APPROVED: {label: "Approved", background: "bg-success"},
    REJECTED: {label: "Rejected", background: "bg-danger"},
  };

  const state = stateLabels[props.request.status];

  return <Card>
    <Card.Body>
      <Container>
        <Row bsPrefix="row justify-content-end">
          <Col bsPrefix="col">
            <span>{props.request.boatName}</span>
          </Col>
          <Col bsPrefix="col me-auto">
            <div className={"h-100 badge "+state.background} style={{float: "right"}}>{state.label}</div>
          </Col>
        </Row>
      </Container>
    </Card.Body>
  </Card>
};


export default OwnerShipChangeRequests;