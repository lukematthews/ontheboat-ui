import { Field } from "react-final-form";

const Bio = ({ details, editable }) => {
  let fieldClass = "form-control ";
  let style = {};
  if (!editable) {
    fieldClass = fieldClass + "form-control-plaintext";
    style = { backgroundColor: "unset", opacity: "unset" };
  }
  return (
    <>
      <label className="fw-bold form-label col-form-label">Bio</label>
      <Field
        className={fieldClass}
        component="textarea"
        initialValue={details.bio}
        rows={5}
        disabled={!editable}
        style={style}
        name="bio"
      ></Field>
    </>
  );
};

export default Bio;