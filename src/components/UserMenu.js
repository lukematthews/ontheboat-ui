import { Dropdown } from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";
const UserMenu = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user);


  useEffect(() => {
    loadProfile();
  }, [Cookies.get("otb")]);


  const loadProfile = async () => {
    console.log("loading profile: "+JSON.stringify(Cookies.get()));
    if (!profile.value && !profile.value.username && Cookies.get("otb")) {
      // get the profile using the token.
      const requestOptions = {
        method: "GET",
        headers: { "Authorization": "Bearer "+Cookies.get("otb")}
      };
      let profile = await fetch("/api/crew/profile", requestOptions)
        .then(response => response.json())
        .catch(error => console.log(error));
      dispatch(setUser(profile));
    }
  }

  const loggedInList = () => {
    if (profile.value.username) {
      return (
        <>
          <Dropdown.Item href="/crew">{profile.value.firstName}</Dropdown.Item>
          <p className="form-text dropdown-item">Boats</p>
          <Dropdown.Divider></Dropdown.Divider>
          <Dropdown.Item>Logout</Dropdown.Item>
        </>
      );
    } else {
      return (
        <>
          <Dropdown.Item href="/login">Login</Dropdown.Item>
        </>
      );
    }
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
          {profile.value.username && profile.value.firstName}
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
