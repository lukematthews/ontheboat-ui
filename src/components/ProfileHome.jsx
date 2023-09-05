import { Button, Col, Container, Row } from "react-bootstrap";
import { apiCall, FormField } from "../common/Utils";
import { Form } from "react-final-form";
import { useAuth0 } from "@auth0/auth0-react";
import { useProfile } from "../common/Profile";
import { useState } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { setProfile } from "../features/profileSlice";

export const ProfileHome = (props) => {
  const profile = useProfile();
  const editableProfile = Object.assign({}, profile);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const onSubmit = (e) => {
    const getToken = async () => {
      await getAccessTokenSilently().then((token) => {
        apiCall({
          endpoint: "/crew/profile",
          body: e,
          jwt: token,
          method: "PUT",
          handlerCallback: (response) => {
            console.log(response);
            // display success dialog.
            setOpen(true);
            dispatch(
              setProfile({ ...response })
            );

          },
        });
      });
    };
    getToken();
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Saved successdfully
          </Alert>
        </Collapse>
      </Box>
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
    </>
  );
};
