import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { apiCall } from "../common/Utils";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    getAccessTokenSilently 
  } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      await getAccessTokenSilently().then(token => {
        apiCall({endpoint: '/crew/profile', jwt: token, handlerCallback: (response)=> {
          dispatch(
            setUser({user: response})
          );
          navigate("/crew");
        }})
      });
    };
    if (isAuthenticated) {
      getToken();
    }
  }, [user]);
  return <Loading></Loading>;
};

export default Login;
