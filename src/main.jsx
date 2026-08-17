import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import { queryClient } from "@/query/query.js";
import { AuthLayout, ThemeProvider } from "./components";
import store from "./store/store.js";

const Home = lazy(() => import("./pages/Home.jsx"));
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const AllPosts = lazy(() => import("./pages/Archive.jsx"));
const AddPost = lazy(() => import("./pages/AddPost.jsx"));
const PostPage = lazy(() => import("./pages/PostPage.jsx"));
const EditPost = lazy(() => import("./pages/EditPost.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Search = lazy(() => import("./pages/Search.jsx"));
const Settings = lazy(() => import("./pages/Settings.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const routeFallback = (
	<div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
		Loading...
	</div>
);

const withSuspense = (Component) => (
	<Suspense fallback={routeFallback}>
		<Component />
	</Suspense>
);

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />} errorElement={withSuspense(NotFound)}>
			<Route index element={withSuspense(Home)} />

			<Route
				path="login"
				element={
					<AuthLayout authentication={false}>
						{withSuspense(SignIn)}
					</AuthLayout>
				}
			/>

			<Route
				path="register"
				element={
					<AuthLayout authentication={false}>
						{withSuspense(SignUp)}
					</AuthLayout>
				}
			/>

			<Route
				path="archive"
				element={
					<AuthLayout authentication={true}>
						{withSuspense(AllPosts)}
					</AuthLayout>
				}
			/>

			<Route path="posts">
				<Route
					path="create"
					element={
						<AuthLayout authentication={true}>
							{withSuspense(AddPost)}
						</AuthLayout>
					}
				/>
				<Route
					path=":slug"
					element={
						<AuthLayout authentication={true}>
							{withSuspense(PostPage)}
						</AuthLayout>
					}
				/>
				<Route path=":slug/private" element={
					<AuthLayout authentication={true}>
						{withSuspense(PostPage)}
					</AuthLayout>
				} />

				<Route
					path=":slug/edit"
					element={
						<AuthLayout authentication={true}>
							{withSuspense(EditPost)}
						</AuthLayout>
					}
				/>

				<Route
					path=":slug/private/edit"
					element={
						<AuthLayout authentication={true}>
							{withSuspense(EditPost)}
						</AuthLayout>
					}
				/>
			</Route>

			<Route path="profile">
				<Route
					path=":userId"
					element={
						<AuthLayout authentication={true}>
							{withSuspense(Profile)}
						</AuthLayout>
					}
				/>
			</Route>

			<Route
				path="search"
				element={
					<AuthLayout authentication={true}>
						{withSuspense(Search)}
					</AuthLayout>
				}
			/>
			<Route
				path="settings"
				element={
					<AuthLayout authentication={true}>
						{withSuspense(Settings)}
					</AuthLayout>
				}
			/>
		</Route>,
	),
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<RouterProvider router={router} />
			</ThemeProvider>
		</Provider>
	</QueryClientProvider>,
);
