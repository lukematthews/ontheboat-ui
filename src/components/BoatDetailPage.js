import { useSelector } from "react-redux";
import BoatDetail from "./BoatDetail";

const BoatDetailPage = (props) => {
    const selectedBoat = useSelector((state) => state.boatRegisterSelectedBoat);

    return <BoatDetail boat={selectedBoat.value} editable></BoatDetail>
};

export default BoatDetailPage;