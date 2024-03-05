import './ForgotPassword.scss'
import { useFormik } from 'formik'
import Button from '../../../GlobalComponents/Button/Button'
import InputField from '../../../GlobalComponents/InputFIeld/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordAsync, selectLoading } from '../AuthSlice'
import { AiTwotoneMail } from 'react-icons/ai'
import { forgotPasswordSchema } from '../../../../validationSchema/schema'

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector(selectLoading)

    const initialValues = { email: '' }
    const formik = useFormik({
        initialValues,
        validationSchema: forgotPasswordSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            await dispatch(forgotPasswordAsync(values))
        }
    })

    return (
        <main className='forgotpassword-main'>
            <div className='title-text'>
                <span>Lost your<h3>Thoughts ?</h3></span>
            </div>
            <form className='form' onSubmit={formik.handleSubmit}>
                <div>
                    <InputField varient={formik.errors.email && formik.touched.email && "error"} name='email' icon={<AiTwotoneMail />} placeholder='example@gmail.com' value={formik.values.email} onChange={formik.handleChange} />
                    {formik.errors.email && formik.touched.email && <span className="error-text">{formik.errors.email}</span>}
                </div>
                <Button width='100%' text="Recover" type='submit' isLoading={isLoading} disabled={isLoading} />
            </form>
        </main>
    )
}

export default ForgotPassword