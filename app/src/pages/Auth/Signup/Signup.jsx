import "./Signup.scss"
import Button from "../../../GlobalComponents/Button/Button"
import InputField from "../../../GlobalComponents/InputFIeld/InputField"
import { AiTwotoneMail } from "react-icons/ai"
import { RiLockPasswordFill } from "react-icons/ri"
import { Navigate, Link } from 'react-router-dom'
import { routes } from "../../../routes"
import { useFormik } from "formik"
import { useDispatch, useSelector } from 'react-redux'
import { validationSchema } from "../../../../validationSchema/schema"
import { selectLoading, signupAccountAsync } from "../AuthSlice"
import google from "../../../assets/svg/Google.svg"
import { isJWT } from "../../../utils/helper"


const Signup = () => {

    const authToken = localStorage.getItem("token");
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading)

    const initialValues = { email: '', password: '' }
    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async () => {
            await dispatch(signupAccountAsync(formik.values));
        }
    })

    return (isJWT(authToken) ? <Navigate to={routes.homepage} /> : <main className='signup-main'>
        <div className='logo'><span>Let's put your</span><h3>Thoughts on</h3> </div>

        <div className='signup-form-section'>
            <Button className='google-button' varient='default-outline' width='100%' type="button" text="Signup with Google" icon={<img src={google} alt='google' />} onClick={() => alert('Google signin is unavailable!')} />
            <div className='deviders'>
                <span className='devider'></span>
                <span>or</span>
                <span className='devider'></span>
            </div>
            <form className='form' onSubmit={formik.handleSubmit}>
                <div className='fields'>
                    <div>
                        <InputField varient={formik.errors.email && formik.touched.email && "error"} id="email" name='email' icon={<AiTwotoneMail />} placeholder='example@gmail.com' value={formik.values.email} onChange={formik.handleChange} />
                        {formik.errors.email && formik.touched.email && <span className="error-text">{formik.errors.email}</span>}
                    </div>
                    <div>
                        <InputField varient={formik.errors.password && formik.touched.password && "error"} id="password" name='password' type='password' icon={<RiLockPasswordFill />} placeholder='Enter your password' toggle={true} value={formik.values.password} onChange={formik.handleChange} />
                        {formik.errors.password && formik.touched.password && <span className="error-text">{formik.errors.password}</span>}
                    </div>
                </div>
                <Button width="100%" text="Signup" type="submit" isLoading={isLoading} disabled={isLoading} />
                <span className="link">Already have an account? <Link to={routes.login}>Login</Link></span>
            </form>
        </div>
    </main>)
}

export default Signup

