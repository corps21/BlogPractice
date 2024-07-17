import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn:false,
    userData: null,
    checkStatus:false
}

const userSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        login: (state,action) => {
            state.isLoggedIn = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
        },
        updateCheckStatus: (state,action) => {
            state.checkStatus = action.payload;
        }
    }
})

export const {login,logout, updateCheckStatus} = userSlice.actions

export default userSlice.reducer