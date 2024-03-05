import * as yup from 'yup';

export const validationSchema = yup.object({
    email: yup.string().lowercase().email('Please enter a valid email address').required("Email is required"),
    password: yup.string().min(6, 'Password must be at least 6 characters').required("Password is required"),
    /* password: yup.string().min(6, 'Password must be at least 6 characters').required("Password is required").matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/,
        'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character.'
    ), */
});

export const forgotPasswordSchema = yup.object({
    email: yup.string().lowercase().email('Please enter a valid email address').required("Email is required"),
});

export const resetPasswordSchema = yup.object({
    newPassword: yup.string().min(6, 'Password must be at least 6 characters').required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match').required('Password confirmation is required'),
});
