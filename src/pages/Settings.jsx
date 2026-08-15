import { SettingsForm } from "@/components";
import {useSelector} from "react-redux";
export default function Settings() {
	const status = useSelector((state) => state.user.isLoggedIn);
	return status ? <SettingsForm /> : <div>Loading...</div>;
}
