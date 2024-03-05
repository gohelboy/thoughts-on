import './Login.scss'
import InputField from "../../../GlobalComponents/InputFIeld/InputField"
import Button from "../../../GlobalComponents/Button/Button"
import { AiTwotoneMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
import { Link, Navigate } from 'react-router-dom'
import { routes } from '../../../routes'
import { useFormik } from 'formik'
import { validationSchema } from '../../../../validationSchema/schema'
import { useDispatch, useSelector } from 'react-redux'
import { loginAccountAsync, selectLoading } from '../AuthSlice'
import google from "../../../assets/svg/Google.svg"
import { isJWT } from '../../../utils/helper'

const Login = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading)
    const authToken = localStorage.getItem("token");

    const initialValues = { email: '', password: '' }
    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async () => {
            await dispatch(loginAccountAsync(formik.values));
        }
    })

    return (isJWT(authToken) ? <Navigate to={routes.homepage} /> :
        <div className='login-main'>
            <div className='logo'><span>Login to your</span><h3>Thoughts on</h3> </div>
            <div className='login-form-section'>
                <Button className='google-button' varient='default-outline' width='100%' type="button" text="Login with Google" icon={<img src={google} alt='google' />} onClick={() => alert('Google signin is unavailable!')} />
                <div className='deviders'>
                    <span className='devider'></span>
                    <span>or</span>
                    <span className='devider'></span>
                </div>
                <form className='form' onSubmit={formik.handleSubmit}>
                    <div className='fields'>
                        <div>
                            <InputField varient={formik.errors.email && formik.touched.email && "error"} name='email' icon={<AiTwotoneMail />} placeholder='example@gmail.com' value={formik.values.email} onChange={formik.handleChange} />
                            {formik.errors.email && formik.touched.email && <span className="error-text">{formik.errors.email}</span>}
                        </div>
                        <div>
                            <InputField varient={formik.errors.password && formik.touched.password && "error"} name='password' type='password' icon={<RiLockPasswordFill />} placeholder='Enter your password' toggle={true} value={formik.values.password} onChange={formik.handleChange} />
                            {formik.errors.password && formik.touched.password && <span className="error-text">{formik.errors.password}</span>}
                        </div>
                        <Link className='link' to={routes.forgotPassword}>Forgot password</Link>
                    </div>
                    <Button width='100%' text="Login" type='submit' isLoading={isLoading} disabled={isLoading} />
                </form>
                <span className='link'>Don't have an account? <Link to={routes.signup}>Signup</Link></span>
            </div>
        </div>
    )
}

export default Login;