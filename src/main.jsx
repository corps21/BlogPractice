import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { AuthLayout, ThemeProvider } from "./components";
import {
	AddPost,
	AllPosts,
	EditPost,
	Home,
	NotFound,
	PostPage,
	Settings,
	SignIn,
	SignUp,
} from "./pages/index.js";
import ProfileRoute from "./routes/ProfileRoute.jsx";
import store from "./store/store.js";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />} errorElement={<NotFound />}>
			<Route path="" element={<Home />} />
			<Route
				path="/signin"
				element={
					<AuthLayout authentication={false}>
						<SignIn />
					</AuthLayout>
				}
			/>
			<Route
				path="/signup"
				element={
					<AuthLayout authentication={false}>
						<SignUp />
					</AuthLayout>
				}
			/>
			<Route
				path="all-post"
				element={
					<AuthLayout authentication={true}>
						<AllPosts />
					</AuthLayout>
				}
			/>
			<Route
				path="add-post"
				element={
					<AuthLayout authentication={true}>
						<AddPost />
					</AuthLayout>
				}
			/>
			<Route
				path="edit-post/:slug"
				element={
					<AuthLayout authentication={true}>
						<EditPost />
					</AuthLayout>
				}
			/>
			<Route
				path="post/:slug"
				element={
					<AuthLayout authentication={true}>
						<PostPage />
					</AuthLayout>
				}
			/>
			<Route path="profile/*" element={<ProfileRoute />}></Route>
			<Route path="/settings" element={<Settings />} />
		</Route>,
	),
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<RouterProvider router={router} />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
);
