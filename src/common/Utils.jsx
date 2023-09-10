import { Form } from "react-bootstrap";
import { Field } from "react-final-form";
import { useAuth0 } from "@auth0/auth0-react";

export const apiCallAuth = async (
  {
    endpoint,
    query,
    body,
    handlerCallback = (response) => {},
    method = "GET",
  } = { endpoint, query, body, handlerCallback, method }
) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  if (isAuthenticated) {
    const getToken = async () => {
      await getAccessTokenSilently().then((token) => {
        apiCall({
          endpoint: endpoint,
          query: query,
          body: body,
          method: method,
          jwt: token,
          handlerCallback: handlerCallback
        });
      });
    };
    getToken();
  }
};

export const apiCallPromise = async (
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
    return fetch("/api" + endpoint, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(`received satus ${response.status}`);
        }
        return response;
      })
      .then((response) => response.json());
  } catch (error) {
    console.log(error);
  }
  return Promise.resolve();
};

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

export const formField = ({field, label, autoComplete, placeHolder}) => {
  return (
    <div>
      <label className="form-label" for={field}>{label}</label>
      <Field
        component="input"
        name={field}
        autoComplete={autoComplete}
        type="text"
        placeholder={placeHolder}
        className="form-control"
      />
    </div>
  );
};

export const FormField = ({field, label, autoComplete, placeHolder, disabled}) => {
  return (
    <div>
      <label className="form-label fw-bold" htmlFor={"form-input."+field}>{label}</label>
      <Field
        id={"form-input."+field}
        component="input"
        name={field}
        autoComplete={autoComplete}
        type="text"
        placeholder={placeHolder}
        className="form-control"
        disabled={disabled ? true : false}
      />
    </div>
  );
};
