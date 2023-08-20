import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { apiCall } from "../common/Utils";

const Login = () => {
  const {
    user,
    isAuthenticated,
    getAccessTokenSilently 
  } = useAuth0();

  useEffect(() => {
    console.log(user.name);
    const token = getAccessTokenSilently().then(token => console.log(token));
    apiCall({endpoint: '/crew/profile', jwt: token, handlerCallback: (response)=> {}})
  }, [user]);
  // get the profile of the user from the backend.
  // if a profile does not exist, allow the user to set their details
  // and create a profile.
  return <></>;
};

export default Login;
