import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSearchParams } from "react-router-dom";
import { apiCall } from "../common/Utils";

const Print = (props) => {
  let [boatId] = useSearchParams();
  let boatIdValue = boatId.get("id");

  const [boat, setBoat] = useState({});
  const [signOnUrl, setSignOnUrl] = useState("");

  const fetchData = async () => {
    apiCall({
      endpoint: "/marina/boat-details",
      query: {boatId: boatIdValue},
      handlerCallback: (data) => {
        setBoat(data);
        setSignOnUrl(
          import.meta.env.VITE_EXTERNAL_IP + "/signOn?id=" + boatIdValue
        );
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, [boat]);

  return (
    <>
      <div>
        <QRCode value={signOnUrl} size={400} />
      </div>
      <div>
        <p>
          <span>{boat.boatName}</span> <span>{boat.sailNumber}</span>{" "}
          <a href={signOnUrl}>{signOnUrl}</a>
        </p>
      </div>
    </>
  );
};

export default Print;
