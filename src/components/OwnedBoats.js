import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../style/OwnedBoats.css";
import { ListGroup } from "react-bootstrap";

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
  const profile = useSelector((state) => state.user);
  
  if (profile.isLoggedIn && profile.value.ownedBoats) {
    // props.callback(profile.value.ownedBoats[0]);
    return <ListGroup defaultActiveKey={"#boat-"+profile.value.ownedBoats.length > 0 ? profile.value.ownedBoats[0].id : "" }>
      {profile.value.ownedBoats.map((boat) => (
        <Boat boat={boat} key={boat.id}></Boat>
      ))}
    </ListGroup>;
  } else {
    console.log("nothing to see here.");
    return <></>;
  }
};

export default OwnedBoats;
