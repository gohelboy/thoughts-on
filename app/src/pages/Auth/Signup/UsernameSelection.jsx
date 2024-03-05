import { MdPerson4 } from "react-icons/md"
import Button from "../../../GlobalComponents/Button/Button"
import InputField from "../../../GlobalComponents/InputFIeld/InputField"
import { FaArrowRight } from "react-icons/fa"
import "./Signup.scss"

const UsernameSelection = () => {
    return (
        <main className="username-select-main">
            <div className='username-form-section'>
                <div className='logo'><h3>Thoughts</h3><h3>-On-</h3> </div>
                <form className='form'>
                    <div className='fields'>
                        <InputField id="email" name='email' label='Username' icon={<MdPerson4 />} placeholder='Set your username' />
                    </div>
                    <Button type="button" width="100%" text="Continue" icon={<FaArrowRight />} iconPos='end' onClick={() => alert("ok")} />
                </form>
            </div>
        </main>
    )
}

export default UsernameSelection