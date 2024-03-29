import { apiCall, apiCallPromise, FormField } from "../common/Utils";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "../features/profileSlice";
import { Button, Form, ListGroup } from "react-bootstrap";
import { ListItem } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CancelIcon from '@mui/icons-material/Cancel';
export const Admin = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [requests, setRequests] = useState([]);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      apiCallPromise({
        endpoint: "/crew/all-ownership-requests",
        jwt: token,
      }).then((response) => setRequests(response));
    });
  }, [user]);

  return (
    <>
      <div className="h2">Admin</div>
      <ListGroup>
        {requests.map((request) => {
          return <Request request={request} key={request.id}></Request>;
        })}
      </ListGroup>
    </>
  );
};

export const Request = (props) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const approveRequestAction = () => {
    getAccessTokenSilently()
      .then(token => {
        apiCallPromise({endpoint: '/crew/action-ownership-change', jwt: token, method: "POST", body: {...props.request, action: 'APPROVED'}})
          .then(response => console.log("success"));
      });
  };

  const formatAction = (action) => {
    const actionMapping = {
      "remove": "Remove owner",
      "sole": "Take sole ownership",
      "partner": "Add the user as a partner",
      "other": "Other... contact user for more information"
    }

    return actionMapping[action];
  };

  let approvedEnabled = props.request.status === "APPROVED" || props.request.status === "REJECTED" ?
  {
    colour: "secondary",
    rejectColour: "secondary",
    enabled: true
  } :
  {
    colour: "success",
    rejectColour: "danger",
    enabled: false
  }
  return (
    <>
    <ListItem className="list-group-item d-flex">
      <div style={{flex: 'auto'}}>
        <div><div>{props.request.submitted+" "+props.request.boatName}</div></div>
        <div className="mb-0"><label className="form-label fw-bold mb-0">Submitted By:</label><input type="text" className="mb-0" style={{marginLeft: "10px", border:0}} value={props.request.submittedBy} readOnly/></div>
        <div><label className="form-label fw-bold">Action:</label><input type="text" style={{marginLeft: "10px", border:0}} value={formatAction(props.request.requestType)} readOnly/></div>
      </div>
      <div><span  style={{marginRight: '5px'}} className="badge bg-primary rounded-pill">{props.request.status}</span></div>
      <div>
        <Button style={{marginRight: '5px'}} variant={approvedEnabled.colour } onClick={approveRequestAction} disabled={approvedEnabled.enabled}><ThumbUpIcon/></Button>
        <Button style={{marginRight: '5px'}} variant={approvedEnabled.rejectColour}  disabled={approvedEnabled.enabled}><ThumbDownIcon/></Button>
        <Button><CancelIcon/></Button>
      </div>
    </ListItem>
    </>
  );
};

export default Admin;
