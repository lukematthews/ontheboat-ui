import { useSelector } from "react-redux";

export function useIsLoggedIn() {
    const profile = useSelector((state) => state.user);
    return profile.value.id ? true : false;
}