import { Form } from "react-bootstrap";
import { Field } from "react-final-form";

export const apiCall = async (
  {
    endpoint,
    query,
    body,
    handlerCallback = (response) => {},
    jwt,
    method = "GET",
  } = { endpoint, query, body, handlerCallback, jwt, method }
) => {
  const requestOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
    body: JSON.stringify(body),
  };
  if (query) {
    endpoint = endpoint + "?" + new URLSearchParams(query).toString();
  }
  if (method === "GET") {
    delete requestOptions.body;
  }
  if (!jwt) {
    delete requestOptions.headers.Authorization;
  }
  try {
    await fetch("/api" + endpoint, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`received satus ${response.status}`);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => handlerCallback(data));
  } catch (error) {
    console.log(error);
  }
};

export const ownsBoat = (profile, boat) => {
  if (Object.keys(profile).length === 0) {
    return false;
  }
  let ownedBoatIndex = profile.ownedBoats.findIndex((b) => b.id === boat.id);
  return ownedBoatIndex >= 0;
};

export const ModelField = ({ model, name, field, editable }) => {
  let fieldClass = editable ? "" : "form-control-plaintext";
  let fieldStyle = editable
    ? {}
    : { backgroundColor: "unset", opacity: "unset" };
  return (
    <>
      <div className="col-xs-12 col-lg-3 my-1">
        <Form.Label column className="fw-bold">
          {name}
        </Form.Label>
      </div>
      <div className="col-xs-12 col-lg-3 my-1">
        <Form.Control
          type="text"
          disabled={!editable}
          defaultValue={model[field]}
          onChange={(e) => {
            model[field] = e.target.value;
          }}
          style={fieldStyle}
          className={fieldClass}
        ></Form.Control>
      </div>
    </>
  );
};

export const formField = (props) => {
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

export const FormField = (props) => {
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
        disabled={props.disabled ? true : false}
      />
    </div>
  );
};
