import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../style/OwnedBoats.css";
import { ListGroup } from "react-bootstrap";
import { useProfile } from "../common/Profile";

const Boat = (props) => {
  const navigate = useNavigate();

  return (
    <ListGroup.Item
      action
      className="boat-row"
      onClick={(e) => navigate(`/boat-detail?boatId=${props.boat.id}`)}
      key={"#boat-"+props.boat.id}
      active={true}
    >
      {props.boat.boatName}
    </ListGroup.Item>
  );
};

const OwnedBoats = (props) => {
  const profile = useProfile();
  
  if (profile.isLoggedIn && profile.ownedBoats) {
    return <ListGroup defaultActiveKey={"#boat-"+profile.ownedBoats.length > 0 ? profile.ownedBoats[0].id : "" }>
      {profile.ownedBoats.map((boat) => (
        <Boat boat={boat} key={boat.id}></Boat>
      ))}
    </ListGroup>;
  } else {
    return <></>;
  }
};

export default OwnedBoats;
