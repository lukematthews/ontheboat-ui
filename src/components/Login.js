import { Container, Row, Col, Button } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

const Login = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e),
    };

    await fetch("/api/auth/signin", requestOptions)
      .then((response) => response.json())
      .then((data) => handleLoginResponse(data));
  };

  const handleLoginResponse = async (data) => {
    // get the profile for the user.
    // const requestOptions = {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // };
    // await fetch("/api/crew/profile", requestOptions).then(response => response.json()).then(data => console.log(data));
    dispatch(setUser(data));
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
