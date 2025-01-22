/* eslint-disable react/prop-types */

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
        setIsLoading(true);
        if(authentication && authentication !== status) navigate('/');
        else if(!authentication && authentication !== status) navigate(location.pathname);
        setIsLoading(false);
    },[status, authentication, navigate, location.pathname])

    return isLoading ? <Loader /> : <>{children}</>

}

export default AuthLayout