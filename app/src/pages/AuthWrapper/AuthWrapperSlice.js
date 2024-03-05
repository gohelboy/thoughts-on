import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUsername } from "./AuthWrapperAPI";
import toast from "react-hot-toast";

const initialState = {
    isLoading: false,
    username: null,
}

export const getUsernameAsync = createAsyncThunk("getUsername", async () => {
    try {
        const response = getUsername();
        if (!response.status) return response;
        else response.data;
    } catch (error) {
        console.log(error)
        return error
    }
})

const AuthWrapperSlice = createSlice({
    name: "authWrapper",
    initialState,
    reducers: {
        setUsernameStatus: (state, action) => {
            state.username = true
            toast.success("new username is set")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsernameAsync.pending, (state, action) => { state.isLoading = true; })
            .addCase(getUsernameAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                if (!action.payload.status) toast.error(action.payload.messaage)
                else state.username = action.payload.data?.username;
            })
    }

})

export const { setUsernameStatus } = AuthWrapperSlice.actions

export const selectCheckUsername = (state) => state.authWrapper.username

export default AuthWrapperSlice.reducer;