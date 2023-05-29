import { useSelector } from "react-redux";

const OwnedBoats = (props) => {
  const profile = useSelector((state) => state.user);

  if (profile.loggedIn && profile.value.ownedBoats) {
    return profile.value.ownedBoats.map((boat) => {
      return (
        <>
          <div></div>
        </>
      );
    });
  } else {
    return <></>;
  }
};

export default OwnedBoats;
