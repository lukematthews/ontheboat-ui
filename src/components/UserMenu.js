import { Dropdown } from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { useIsLoggedIn } from "./useIsLoggedIn";
const UserMenu = () => {
  const profile = useSelector((state) => state.user);

  const loggedIn = useIsLoggedIn();

  const loggedInList = () => {
    if (loggedIn) {
      return (
        <>
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
          {profile.value.username && profile.value.username}
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
