import { useAuth0 } from "@auth0/auth0-react";
import { apiCall } from "./Utils";
import { useEffect, useState } from "react";

export function useProfile() {
  const [profile, setProfile] = useState({});
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const getToken = async () => {
        await getAccessTokenSilently().then((token) => {
          apiCall({
            endpoint: "/crew/profile",
            jwt: token,
            handlerCallback: (response) => {
              setProfile(response);
            },
          });
        });
      };
      getToken();
    }
  }, [user]);
  return profile;
}
