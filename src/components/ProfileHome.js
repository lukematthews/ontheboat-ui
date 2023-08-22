import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { apiCall, formField, FormField } from "../common/Utils";
import { Form } from "react-final-form";
import { Cookies, useCookies } from "react-cookie";
import { useFetch } from "../common/Utils";

export const ProfileHome = (props) => {
  const profile = useSelector((state) => state.user);
  const [cookies, setCookie, removeCookie] = useCookies(["otb"]);
  const editableProfile = Object.assign({}, profile.value);

  const onSubmit = (e) => {
    apiCall({
      endpoint: "/crew/profile",
      body: e,
      jwt: cookies.otb,
      handlerCallback: handleResponse,
      method: "PUT",
    });
  };

  const handleResponse = (response) => {};

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={editableProfile}
      render={({ handleSubmit, form, submitting, pristine, crewRequest }) => (
        <Container>
          <form onSubmit={handleSubmit} action="PUT">
            <Row>
              <FormField
                autoComplete="first-name"
                label="First Name"
                placeHolder="First Name"
                field="firstName"
              ></FormField>
              <FormField
                autoComplete="family-name"
                label="Last Name"
                placeHolder="Last Name"
                field="lastName"
              ></FormField>
              <FormField
                autoComplete="tel"
                label="Mobile"
                placeHolder="Mobile"
                field="mobile"
              ></FormField>
              <FormField
                autoComplete="email"
                label="Email"
                placeHolder="Email"
                field="email"
              ></FormField>
            </Row>
            <Row className="mt-2">
              <Col>
                <Button type="submit">Save</Button>
              </Col>
            </Row>
          </form>
        </Container>
      )}
    ></Form>
  );
};
