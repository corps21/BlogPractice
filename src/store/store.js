import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";

const store = configureStore({
	reducer: {
		user: userSlice,
		auth: authSlice,
	},
});

export default store;
