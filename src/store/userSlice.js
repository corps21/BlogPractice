import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "@/microservice/userService";

const initialState = {
	isLoggedIn: false,
	userData: null,
};

export const setCurrentUser = createAsyncThunk("setCurrentUser", async () => {
	const response = await userService.getCurrentUser();
	if (!response.success) {
		throw new Error(response.message);
	}
	return response.data;
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			state.userData = action.payload.userData;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.userData = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(setCurrentUser.pending, (state) => {
			state.isLoggedIn = false;
			state.userData = null;
		});

		builder.addCase(setCurrentUser.fulfilled, (state, action) => {
			state.isLoggedIn = true;
			state.userData = action.payload.user;
		});

		builder.addCase(setCurrentUser.rejected, (state) => {
			state.isLoggedIn = false;
			state.userData = null;
		});
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
