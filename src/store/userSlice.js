import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "@/service/userService";

const initialState = {
	isLoggedIn: false,
	data: null,
	authInitialized: false,
};

export const setCurrentUser = createAsyncThunk("setCurrentUser", async () => {
	const response = await userService.getCurrentUser();
	if (!response.success) {
		throw new Error(response.message);
	}
	return response?.data;
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			state.data = action.payload.data;
			state.authInitialized = true;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.data = null;
			state.authInitialized = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(setCurrentUser.pending, (state) => {
			state.isLoggedIn = false;
			state.data = null;
			state.authInitialized = false;
		});

		builder.addCase(setCurrentUser.fulfilled, (state, action) => {
			state.isLoggedIn = true;
			state.data = action.payload?.user;
			state.authInitialized = true;
		});

		builder.addCase(setCurrentUser.rejected, (state) => {
			state.isLoggedIn = false;
			state.data = null;
			state.authInitialized = true;
		});
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
