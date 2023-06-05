import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedBoatRegister } from "../features/boatRegisterSlice";
import "../style/OwnedBoats.css";
import { ListGroup } from "react-bootstrap";

const OwnedBoats = (props) => {
  const profile = useSelector((state) => state.user);
  const selectedBoat = useSelector((state) => state.boatRegisterSelectedBoat);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Boat = (props) => {
    return (
      <ListGroup.Item
        action
        className="boat-row"
        onClick={(e) => navigate(`/boat-detail?boatId=${props.boat.id}`)}
        href={"#boat-"+props.boat.id}
      >
        {props.boat.boatName}
      </ListGroup.Item>
    );
  };

  if (profile.isLoggedIn && profile.value.ownedBoats) {
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
