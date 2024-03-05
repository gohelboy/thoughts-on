import "./VerifyUser.scss"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import loading1 from "../../../assets/lottie-animations/loading1.json"
import { activateUserAsync } from "../AuthSlice";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { routes } from "../../../routes";

const VerifyUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        const token = queryParams.get('authToken');
        if (token) {
            setTimeout(() => {
                dispatch(activateUserAsync(token))
            }, 3000);
        } else {
            return navigate(routes.login, { replace: true })
        }
    }, [])


    return (
        <main className="main-verifyuser">
            <div className="wrapper">
                <Lottie className="animation" animationData={loading1} />
                <div className="message"> Your account is being activated.
                    Get ready to be redirected to your
                    <div><b>'Thoughts On'</b></div>
                </div>
            </div>
        </main >
    )
}


export default VerifyUser;