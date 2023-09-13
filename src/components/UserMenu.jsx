import { Dropdown } from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserMenu = () => {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const listBoats = () => {
    if (profile.value.ownedBoats) {
      return profile.value?.ownedBoats.map(b => {
        return (
          <Dropdown.Item key={b.externalId} onClick={() => navigate("/boat-detail?boatId="+b.externalId)}>{b.boatName}</Dropdown.Item>
        );
      });
    } else {
      return <></>;
    }
  };

  const loggedInList = () => {
    return isAuthenticated ? <>
          <Dropdown.Item onClick={() => navigate("/crew") }>{profile.value.firstName}</Dropdown.Item>
          { listBoats() }
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
