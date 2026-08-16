import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useAuthHomeRedirect() {
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
	const status = useSelector((state) => state.user.authInitialized);

	const navigate = useNavigate();
	useEffect(() => {
		if (isLoggedIn) {
			navigate("/", { replace: true });
		}
	},[isLoggedIn, navigate]);

	return status
}
