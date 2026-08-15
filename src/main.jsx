import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { queryClient } from "@/query/query.js";
import { AuthLayout, ThemeProvider } from "./components";
import {
	AddPost,
	AllPosts,
	EditPost,
	Home,
	NotFound,
	PostPage,
	Search,
	Settings,
	SignIn,
	SignUp,
} from "./pages/index.js";
import ProfileRoute from "./routes/ProfileRoute.jsx";
import store from "./store/store.js";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />} errorElement={<NotFound />}>
			<Route index element={<Home />} />

			<Route
				path="login"
				element={
					<AuthLayout authentication={false}>
						<SignIn />
					</AuthLayout>
				}
			/>

			<Route
				path="register"
				element={
					<AuthLayout authentication={false}>
						<SignUp />
					</AuthLayout>
				}
			/>

				<Route path="archive"
					element={
						<AuthLayout authentication={true}>
							<AllPosts />
						</AuthLayout>
					}
				/>

			<Route path="posts">
				<Route
					path="create"
					element={
						<AuthLayout authentication={true}>
							<AddPost />
						</AuthLayout>
					}
				/>
				<Route
					path=":slug"
					element={
						<AuthLayout authentication={true}>
							<PostPage />
						</AuthLayout>
					}
				/>
				<Route
					path=":slug/edit"
					element={
						<AuthLayout authentication={true}>
							<EditPost />
						</AuthLayout>
					}
				/>
			</Route>

			<Route path="profile/*" element={<ProfileRoute />} />
			<Route
				path="search"
				element={
					<AuthLayout authentication={true}>
						<Search />
					</AuthLayout>
				}
			/>
			<Route path="settings" element={
				<AuthLayout authentication={true}>
					<Settings />
				</AuthLayout>
			} />
		</Route>,
	),
);

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
					<RouterProvider router={router} />
				</ThemeProvider>
			</Provider>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
		</QueryClientProvider>
	// </React.StrictMode> 
	,
);
