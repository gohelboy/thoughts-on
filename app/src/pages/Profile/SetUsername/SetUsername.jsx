import "./SetUsername.scss";
import Button from "../../../GlobalComponents/Button/Button";
import InputField from "../../../GlobalComponents/InputFIeld/InputField";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { checkUsernameAvailability, setUsername } from "./SetUsernameAPI";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUsernameStatus } from "../../AuthWrapper/AuthWrapperSlice";

const SetUsername = () => {
    const dispatch = useDispatch();
    const [isUsernameAvailable, setUsernameAvailability] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [usernameInput, setUsernameInput] = useState('');

    const [showError, setShowError] = useState(false);

    const checkUsername = async () => {
        try {
            const response = await checkUsernameAvailability(usernameInput.trim());
            const responseData = response.data;

            if (!responseData?.status) {
                toast.error(responseData.message);
            } else {
                if (responseData.data.available === false) setShowError(true);
                setUsernameAvailability(responseData.data.available);
            }
            setLoading(false);
        } catch (error) {
            toast.error("An error occurred while checking the username.");
            setLoading(false);
        }
    };


    const handleSetUsername = async () => {
        const response = await setUsername({ username: usernameInput.trim() });
        const responseData = response.data;
        if (!responseData?.status) {
            toast.error(responseData.message);
        } else {
            dispatch(setUsernameStatus());
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            if (usernameInput.trim().length > 2) {
                setLoading(true);
                checkUsername();
            }
        }, 600);

        if (usernameInput.trim().length === 0) {
            setUsernameAvailability(false);
        }

        return () => clearTimeout(delay);
    }, [usernameInput]);


    return (
        <div className="setUsername-main">
            <span>
                Set your username <br /> unique as your <b>Thoughts</b>
            </span>
            <div className="form">
                <div className="field">
                    <InputField icon={<FaUser />} width={"270px"} placeholder="Username" name="username" loading={isLoading} value={usernameInput} onChange={(e) => { setUsernameInput(e.target.value); setShowError(false) }} />
                    {showError && !isUsernameAvailable && usernameInput.length > 2 && <p className='error-text'>This username is taken!</p>}
                    {!showError && isUsernameAvailable && usernameInput.length > 2 && <p className='valid-text'>This username is available</p>}
                    {usernameInput.length < 3 && usernameInput.length > 0 && <p className='error-text'>username must be atlest 3 character</p>}
                </div>
                <Button width="100%" text="Continue" onClick={handleSetUsername} disabled={!isUsernameAvailable} />
            </div>
        </div >
    );
};

export default SetUsername;
