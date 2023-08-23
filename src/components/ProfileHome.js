import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { apiCall, formField, FormField } from "../common/Utils";
import { Form } from "react-final-form";
import { Cookies, useCookies } from "react-cookie";
import { useFetch } from "../common/Utils";
import { setUser } from "../features/userSlice";
import { useAuth0 } from "@auth0/auth0-react";

export const ProfileHome = (props) => {
  const profile = useSelector((state) => state.user);
  const [cookies, setCookie, removeCookie] = useCookies(["otb"]);
  const editableProfile = Object.assign({}, profile.value);
  const dispatch = useDispatch();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const onSubmit = (e) => {
    const getToken = async () => {
      await getAccessTokenSilently().then((token) => {
        apiCall({
          endpoint: "/crew/profile",
          body: e,
          jwt: token,
          method: "PUT",
          handlerCallback: (response) => {
            dispatch(setUser({ user: response }));
            console.log(response);
          },
        });
      });
    };
    getToken();
  };

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
