import { useSelector } from "react-redux";
import BoatDetail from "./BoatDetail";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ownsBoat, apiCall } from "../common/Utils";
import { useProfile } from "../common/Profile";

const BoatDetailPage = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const boatId = searchParams.get("boatId");
  const selectedBoat = useSelector((state) => state.boatRegisterSelectedBoat);
  const profile = useSelector((state) => state.profile);
  const [boat, setBoat] = useState({});
  const navigate = useNavigate();

  const fetchBoat = async (boatId) => {
    await apiCall({
      endpoint: "/marina/boat-details",
      query: {boatId: boatId},
      handlerCallback: (boat) => {setBoat(boat)},
    });
  };

  useEffect(() => {
    if (boatId) {
      fetchBoat(boatId);
    } else if (Object.keys(selectedBoat.value).length > 0) {
      setBoat(selectedBoat.value);
    } else {
      navigate("/crew");
    }
  }, [boatId]);

  return (
    <>
      <Modal.Header>
        <Modal.Title className="w-100">
          <p style={{ textAlign: "center" }}>
            <span className="h1">{boat.boatName}</span>{" "}
            <span className="h3">{boat.sailNumber}</span>
          </p>
        </Modal.Title>
      </Modal.Header>
      <BoatDetail
        boat={boat}
        editable={ownsBoat(profile.value, boat)}
      ></BoatDetail>
    </>
  );
};

export default BoatDetailPage;
