import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { apiCall } from "../common/Utils";
import { Cookies, useCookies } from "react-cookie";

const Onboard = (props, children) => {
  const [cookies, setCookie, removeCookie] = useCookies(["otb"]);
  const boatId = props.boatId;
  const [onboardList, setOnboardList] = useState([]);
  let day = props.day ? props.day : dayjs().format("YYYY-MM-DD");
  useEffect(() => {
    if (!boatId) {
      return;
    }
    apiCall({
      endpoint: `/crew/onboard?boatId=${boatId}&day=${day}`,
      handlerCallback: setOnboardList,
      jwt: cookies.otb,
    });
  }, [boatId]);
  return (
    <>
      <Container>
        <Row>
          <Col>
              <></>
              {onboardList &&
                onboardList.map((onboard) => (
                  props.children && props.children(onboard)
                ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Onboard;
