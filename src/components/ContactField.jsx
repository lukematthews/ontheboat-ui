import { Form, Field } from "react-final-form";

const ContactField = ({ boat }) => {
  let fieldClass = "form-control-plaintext";
  let fieldStyle = { backgroundColor: "unset", opacity: "unset" };

  const renderOwnerNames = (boat) => {
    if (!boat.owners) {
      return "";
    }
    let renderedNames = boat.owners
      .map((owner) =>
        `${format(owner.firstName)} ${format(owner.lastName)}`.trim()
      )
      .join(", ");

    return renderedNames;
  };

  const format = (value) => {
    return value ? value : "";
  };

  return (
    <>
      <div className="my-1">
        <label className="fw-bold">Owners</label>
      </div>
      <div className="my-1">
        <input type="text" className={fieldClass} style={fieldStyle} disabled value={renderOwnerNames(boat)}></input>
      </div>
    </>
  );
};

export default ContactField;
