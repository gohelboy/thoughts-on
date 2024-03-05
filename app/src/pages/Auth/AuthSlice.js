import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { routes } from "../../routes";
import { activateUser, forgotPassword, loginAccount, resetPassword, signupAccount } from "./AuthAPI";

export const signupAccountAsync = createAsyncThunk(
    'auth/signup',
    async (data) => {
        try {
            const response = await signupAccount(data);
            if (!response.status) return response
            else return response.data
        } catch (error) {
            console.log(error);
            return error
        }
    },
);

export const loginAccountAsync = createAsyncThunk(
    'auth/login',
    async (data) => {
        try {
            const response = await loginAccount(data);
            if (!response.status) return response
            else return response.data
        } catch (error) {
            console.log(error);
            return error
        }
    },
);

export const forgotPasswordAsync = createAsyncThunk(
    'auth/forgot-password',
    async (data) => {
        try {
            const response = await forgotPassword(data);
            if (!response.status) return response;
            else return response.data;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
);

export const resetPasswordAsync = createAsyncThunk(
    'auth/reset-password',
    async (data) => {
        try {
            const response = await resetPassword(data);
            if (!response.status) return response;
            else return response.data;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
);

export const activateUserAsync = createAsyncThunk(
    'auth/activate-user',
    async (data) => {
        try {
            const response = await activateUser(data);
            if (!response.status) return response;
            else return response.data;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
);

const initialState = {
    isLoading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // signup
        builder.addCase(signupAccountAsync.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(signupAccountAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            if (!action.payload.status) {
                toast.error(action.payload.message)
            } else {
                window.location.href = routes.activateAccount;
            }
        })

            //login
            .addCase(loginAccountAsync.pending, (state, action) => { state.isLoading = true; })
            .addCase(loginAccountAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                if (!action.payload.status) toast.error(action.payload.message)
                else localStorage.setItem('token', action.payload?.data);
            })


            //forget Passwrd
            .addCase(forgotPasswordAsync.pending, (state, action) => { state.isLoading = true; })
            .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                if (!action.payload.status) {
                    toast.error(action.payload.message)
                } else {
                    toast.success(action.payload.message)
                    console.log(action.payload.message)
                }
            })


            //reset Passwrd
            .addCase(resetPasswordAsync.pending, (state, action) => { state.isLoading = true; })
            .addCase(resetPasswordAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                if (!action.payload.status) {
                    toast.error(action.payload.message)
                } else {
                    toast.success(action.payload.message)
                    setTimeout(() => {
                        window.location.href = routes.login;
                    }, 3000)
                }
            })


            // verify user
            .addCase(activateUserAsync.pending, (state, action) => { state.isLoading = false })
            .addCase(activateUserAsync.fulfilled, (state, action) => {
                if (!action.payload.status) {
                    toast.error(action.payload.message)
                    setTimeout(() => {
                        window.location.href = routes.login;
                    }, 4000)

                }
                else {
                    toast.success(action.payload.message)
                    const token = action.payload.data;
                    localStorage.setItem('token', token);
                    setTimeout(() => {
                        window.location.href = routes.homepage;
                    }, 3000)
                }
            })
    }
})

export default authSlice.reducer;

export const selectLoading = (state) => state.auth.isLoading