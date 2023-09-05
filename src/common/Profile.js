import { useAuth0 } from "@auth0/auth0-react";
import { apiCall } from "./Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../features/profileSlice";

export function useProfile() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [profileState, setProfileState] = useState(user);
  const dispatch = useDispatch();
  const reduxProfile = useSelector((state) => state.profile);

  if (!reduxProfile) {
    dispatch(setProfile({...profileState}));
  }

  useEffect(() => {
    if (isAuthenticated) {
      const getToken = async () => {
        await getAccessTokenSilently().then((token) => {
          apiCall({
            endpoint: "/crew/profile",
            jwt: token,
            handlerCallback: (response) => {
              setProfileState(response);
              dispatch(
                setProfile({ ...response })
              );
            },
          });
        });
      };
      getToken();
    }
  }, [user]);
  return profileState;
}
