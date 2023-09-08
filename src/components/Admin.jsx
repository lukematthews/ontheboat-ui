import { apiCall, apiCallPromise, FormField } from "../common/Utils";
import { useAuth0 } from "@auth0/auth0-react";
import { useProfile } from "../common/Profile";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "../features/profileSlice";
import { Button, ListGroup } from "react-bootstrap";
import { ListItem } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CancelIcon from '@mui/icons-material/Cancel';
export const Admin = (props) => {
  const profile = useProfile();
  const editableProfile = Object.assign({}, profile);
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

  const onSubmit = (e) => {
    const getToken = async () => {
      await getAccessTokenSilently().then((token) => {
        apiCall({
          endpoint: "/crew/profile",
          body: e,
          jwt: token,
          method: "PUT",
          handlerCallback: (response) => {
            console.log(response);
            // display success dialog.
            setOpen(true);
            dispatch(setProfile({ ...response }));
          },
        });
      });
    };
    getToken();
  };

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
  let approvedEnabled = props.request.status === "APPROVED" ?
  {
    colour: "secondary",
    enabled: true
  } :
  {
    colour: "success",
    enabled: false
  }
  return (
    <>
    <ListItem className="list-group-item d-flex">
      <div style={{flex: 'auto'}}>{props.request.submitted+" "+props.request.boatName}</div>      
      <div><span  style={{marginRight: '5px'}} className="badge bg-primary rounded-pill">{props.request.status}</span></div>
      <div>
        <Button style={{marginRight: '5px'}} variant={approvedEnabled.colour } onClick={approveRequestAction} disabled={approvedEnabled.enabled}><ThumbUpIcon/></Button>
        <Button style={{marginRight: '5px'}} variant="danger" ><ThumbDownIcon/></Button>
        <Button><CancelIcon/></Button>
      </div>
    </ListItem>
    </>
  );
};

export default Admin;
