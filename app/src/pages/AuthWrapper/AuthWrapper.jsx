
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUsernameAsync, selectCheckUsername } from "./AuthWrapperSlice";
import { isJWT } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import SetUsername from "../Profile/SetUsername/SetUsername";

const AuthWrapper = ({ children }) => {
    const navigate = useNavigate();
    const checkUsername = useSelector(selectCheckUsername)
    const dispatch = useDispatch();
    const authToken = localStorage.getItem('token');

    useEffect(() => { dispatch(getUsernameAsync()) }, [dispatch])

    useEffect(() => {
        if (!isJWT(authToken)) { navigate(routes.login, { replace: true }) }
    }, [authToken])

    if (checkUsername == false) return <SetUsername />

    return (<> {children} </>)
}

export default AuthWrapper