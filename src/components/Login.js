import { Container, Row, Col, Button } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import base64 from "base-64";
import Cookies from "js-cookie";
import { apiCall } from "../common/Utils";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({username: e.username, password: e.password}),
      headers: {"Content-Type": "application/json"}
    };

    await fetch("/api/auth-2/signin", requestOptions)
      .then((response) => response.json())
      .then(data => handleLoginResponse(data));
  };

  const handleLoginResponse = async (data) => {
    // setCookie("token", data, {path: "/"});
    Cookies.set("otb", data.token, )

    // get the profile for the user.
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer "+data}
    };
    let profile = await fetch("/api/crew/profile", requestOptions).then(response => response.json());
    dispatch(setUser(profile));
    navigate("/crew");
  }

  const formField = (props) => {
    return (
      <div>
        <label className="form-label">{props.label}</label>
        <Field
          component="input"
          name={props.field}
          autoComplete={props.autoComplete}
          type="text"
          placeholder={props.placeHolder}
          className="form-control"
        />
      </div>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form
            onSubmit={handleSubmit}
            initialValues={{}}
            render={({
              handleSubmit,
              form,
              submitting,
              pristine,
              crewRequest,
            }) => (
              <form onSubmit={handleSubmit} action="POST">
                <>
                  {formField({
                    label: "Username",
                    placeHolder: "User name",
                    field: "username",
                  })}
                  <div>
                    <label className="form-label">Password</label>
                    <Field
                      component="input"
                      name="password"
                      autoComplete="new-password"
                      type="password"
                      className="form-control"
                    />
                  </div>
                  <div className="mt-2">
                    <Button type="submit">Login</Button>
                  </div>
                </>
              </form>
            )}
          ></Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
