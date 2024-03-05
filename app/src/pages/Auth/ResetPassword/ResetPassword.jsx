import "./ResetPassword.scss"
import Button from "../../../GlobalComponents/Button/Button"
import InputField from "../../../GlobalComponents/InputFIeld/InputField"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { resetPasswordAsync, selectLoading } from "../AuthSlice"
import { RiLockPasswordFill } from "react-icons/ri"
import { resetPasswordSchema } from "../../../../validationSchema/schema"
import { routes } from "../../../routes"
import { useNavigate } from "react-router-dom"

const ResetPassword = () => {
    const navigate = useNavigate();
    const token = new URLSearchParams(window.location.search).get('token');

    const dispatch = useDispatch()
    const isLoading = useSelector(selectLoading)

    const initialValues = { newPassword: '', confirmPassword: '' }
    const formik = useFormik({
        initialValues,
        validationSchema: resetPasswordSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            const payload = {
                token: token,
                newPassword: values.newPassword
            }
            await dispatch(resetPasswordAsync(payload))
        }
    })

    if (!token) return navigate(routes.login, { replace: true })

    return (
        <main className="resetPassword-main">
            <div className='title-text'>
                <span>Set new<h3>Thoughts</h3></span>
            </div>
            <form className='form' onSubmit={formik.handleSubmit}>
                <div className="fields">
                    <div>
                        <InputField varient={formik.errors.newPassword && formik.touched.newPassword && "error"} type="password" toggle={true} name='newPassword' icon={<RiLockPasswordFill />} placeholder='New Password' value={formik.values.newPassword} onChange={formik.handleChange} />
                        {formik.errors.newPassword && formik.touched.newPassword && <span className="error-text">{formik.errors.newPassword}</span>}
                    </div>
                    <div>
                        <InputField varient={formik.errors.confirmPassword && formik.touched.confirmPassword && "error"} toggle={true} type="password" name='confirmPassword' icon={<RiLockPasswordFill />} placeholder='Confirm Passsword' value={formik.values.confirmPassword} onChange={formik.handleChange} />
                        {formik.errors.confirmPassword && formik.touched.confirmPassword && <span className="error-text">{formik.errors.confirmPassword}</span>}
                    </div>
                </div>
                <Button width='100%' text="Recover" type='submit' isLoading={isLoading} disabled={isLoading} />
            </form>
        </main>
    )
}

export default ResetPassword