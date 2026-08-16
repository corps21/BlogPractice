import { useDispatch } from "react-redux";
import { logout} from "@/store/userSlice";
import {removeAccessToken} from "@/store/authSlice";

import {queryClient} from "@/query/query";

export function useLogout() {
    const dispatch = useDispatch();

    return (fn = () => {}) => {
        dispatch(logout());
        dispatch(removeAccessToken());
        queryClient.clear();
        fn();
    }
}