import { Toast, ToastHeader, ToastBody } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SignUpWelcome = (props) => {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  const profile = useSelector((state) => state.user);
  useEffect(() => {
    setShowA(profile.status !== "Placeholder");
  }, profile);

  return (
    <>
      <Toast className="w-100" show={showA} onClose={toggleShowA}>
        <ToastHeader>
          <strong className="me-auto">Welcome</strong>
        </ToastHeader>
        <ToastBody>
          <p>
            Thanks for signing up. Next step is to complete your account by
            completing your profile.
          </p>
          <p>
            Completing your profile allows you to request ownership of boats and
            streamlines your sign on process
          </p>
        </ToastBody>
      </Toast>
    </>
  );
};

export default SignUpWelcome;
