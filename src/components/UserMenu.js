import { Dropdown } from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { apiCall } from "../common/Utils";
// import { useAuth } from "react-oidc-context";
import { useKeycloak } from "@react-keycloak/web";

const UserMenu = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user);
  const { keycloak } = useKeycloak();
  // const auth = useAuth();

  const login = useCallback(() => {
    keycloak?.login();
  }, [keycloak]);

  useEffect(() => {
    loadProfile();
  }, [Cookies.get("otb")]);

  const loadProfile = async () => {
    if (!profile.isLoggedIn && Cookies.get("otb")) {
      apiCall({
        endpoint: "/crew/profile",
        jwt: Cookies.get("otb"),
        handlerCallback: (profile) =>
          dispatch(setUser({ user: profile, isLoggedIn: true })),
      });
    }
  };

  const logout = async () => {
    // auth.removeUser();
  };

  const loggedInList = () => {
    // if (auth.isAuthenticated) {
    if (keycloak?.authenticated) {
      return (
        <>
          {/* <Dropdown.Item href="/crew">{auth.user?.profile.preferred_username}</Dropdown.Item> */}
          <p className="form-text dropdown-item">Boats</p>
          <Dropdown.Divider></Dropdown.Divider>
          <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
        </>
      );
    } else {
      return (
        <>
          <Dropdown.Item onClick={login}>Login</Dropdown.Item>
        </>
      );
    }
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          {/* {auth.user?.profile.preferred_username} */}
          <PersonIcon></PersonIcon>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-end">
          {loggedInList()}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default UserMenu;
