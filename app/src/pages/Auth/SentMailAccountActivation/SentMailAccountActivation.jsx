import "./SentMailAccountActivation.scss"
import Lottie from "lottie-react";
import mailbox from "../../../assets/lottie-animations/mailbox.json"

const SentMailAccountActivation = () => {
    return (
        <div className="main-sent-mail-acocunt-activation">
            <div className="content-box">
                <Lottie className="animation" animationData={mailbox} loop={true} />
                <span className="message">
                    Thank you for registering!
                    We've just sent an account activation link
                    to your email address. Please check your
                    inbox and follow the link to activate your
                    account.
                </span>
            </div>
        </div>
    )
}

export default SentMailAccountActivation