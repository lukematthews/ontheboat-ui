import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSearchParams } from "react-router-dom";

const Print = (props) => {
  let [boatId] = useSearchParams();
  let boatIdValue = boatId.get("id");

  const [boat, setBoat] = useState({});
  const [signOnUrl, setSignOnUrl] = useState("");

  const fetchData = async () => {
    const response = await fetch(`/api/marina/boat-details?boatId=${boatIdValue}`);
    const data = await response.json();
    setBoat(data);
    setSignOnUrl(
      process.env.REACT_APP_EXTERNAL_IP + "/signOn?id=" + boatIdValue
    );
  };

  useEffect(() => {
    fetchData();
  }, [boat]);

  return (
    <>
      <div>
        <QRCode value={signOnUrl} size={400}/>
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
