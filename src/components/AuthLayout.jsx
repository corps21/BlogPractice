import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { Loader } from ".";

function AuthLayout({ children, authentication = true }) {

	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const authInitialized = useSelector((state) => state.user.authInitialized);
	const location = useLocation();

	if (!authInitialized) {
		return <Loader />;
	}

	if (authentication && !isLoggedIn) {
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		);
	}

	if (!authentication && isLoggedIn) {
		return <Navigate to="/" replace />;
	}

	return children;
}

export default AuthLayout;
