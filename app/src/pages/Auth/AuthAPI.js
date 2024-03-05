import API from "../../utils/API"

export const signupAccount = async (data) => {
    return API.post('/auth/signup', data).then((response) => response).catch((error) => error);
}

export const loginAccount = async (data) => {
    return API.post('/auth/login', data).then((response) => response).catch((error) => error);
}

export const forgotPassword = async (data) => {
    return API.post('/auth/forgot-password', data).then((response) => response).catch((error) => error);
}

export const resetPassword = async (data) => {
    return API.post(`/auth/reset-password/${data?.token}`, data).then((response) => response).catch((error) => error);
}

export const activateUser = async (token) => {
    return API.get(`/auth/activate/${token}`).then((response) => response).catch((err) => err)
}