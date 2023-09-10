import { useSelector } from "react-redux";
import BoatDetail from "./BoatDetail";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { ownsBoat, apiCall } from "../common/Utils";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";

const BoatDetailPage = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const boatId = searchParams.get("boatId");
  const selectedBoat = useSelector((state) => state.boatRegisterSelectedBoat);
  const profile = useSelector((state) => state.profile);
  const [boat, setBoat] = useState({});
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const fetchBoat = async (boatId) => {
    await apiCall({
      endpoint: "/marina/boat-details",
      query: { boatId: boatId },
      handlerCallback: (boat) => {
        setBoat(boat);
      },
    });
  };

  const saveBoat = async values => {
    console.log(values);
    const getToken = async () => {
      await getAccessTokenSilently().then((token) => {
        apiCall({
          endpoint: "/boat/update-boat-details",
          body: values,
          jwt: token,
          method: "PUT",
          handlerCallback: (response) => {
            console.log("saved successfully");
          },
        });
      });
    };
    getToken();
  };

  useEffect(() => {
    if (boatId) {
      fetchBoat(boatId);
    } else if (Object.keys(selectedBoat.value).length > 0) {
      setBoat(selectedBoat.value);
    } else {
      navigate("/crew");
    }
  }, [selectedBoat.value]);

  return (
    <>
      <BoatDetail
        boat={boat}
        editable={ownsBoat(profile.value, boat)}
        save={saveBoat}
        dialogMode={false}
      ></BoatDetail>
    </>
  );
};
export default BoatDetailPage;
