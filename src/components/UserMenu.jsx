import { Dropdown } from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const loggedInList = () => {
    return isAuthenticated ? <>
          <Dropdown.Item onClick={() => navigate("/crew") }>{user.name}</Dropdown.Item>
          <p className="form-text dropdown-item">Boats</p>
          <Dropdown.Divider></Dropdown.Divider>
          <Dropdown.Item onClick={(e) => {e.preventDefault(); logout()}}>Logout</Dropdown.Item>
        </> :
        <>
          <Dropdown.Item onClick={() => loginWithRedirect({}).then(() => navigate("/crew"))}>Login</Dropdown.Item>
        </>;
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">
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
