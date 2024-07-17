import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

function AuthLayout({children,authentication = true}) {

    const [isLoading, setIsLoading] = useState(true);
    const status = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log(status);
    },[status])

    useEffect(() => {
        if(authentication && status !== authentication) {
            navigate("/signin");
        } else if(!authentication && status !== authentication) {
            navigate(location.pathname); 
        }
        setIsLoading(false);
    },[status, authentication, navigate, location.pathname])

    return isLoading ? <Loader /> : <>{children}</>

}

export default AuthLayout