import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { OverlayTrigger, Button, Tooltip } from "react-bootstrap";
import { ownsBoat } from "../common/Utils";

const EditButton = ({boat, editModeCallback}) => {
  const profile = useSelector((state) => state.profile);
  let crewOwnsBoat = ownsBoat(profile.value, boat);

  let message = crewOwnsBoat
    ? "Edit the details of this boat"
    : "Login to be able to edit boat details of boats that you own";
  let style = crewOwnsBoat ? {} : { pointerEvents: "none" };
  return (
    <OverlayTrigger
      overlay={<Tooltip id="tooltip-disabled">{message}</Tooltip>}
    >
      <span className="d-inline-block">
        <Button
          disabled={!crewOwnsBoat}
          style={style}
          onClick={() => {
            editModeCallback(true);
          }}
        >
          Edit
        </Button>
      </span>
    </OverlayTrigger>
  );
};

export default EditButton;