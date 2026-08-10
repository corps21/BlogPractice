import brandicon from "@/assets/brandicon.svg";
import {Link} from "react-router-dom";

import {UserAvatar} from "@/components/UserAvatar";

export function Navbar() {

    return <header className="flex items-center justify-center gap-4 py-2 bg-primary">

        <Link to="/" className="flex items-center gap-2 cursor-pointer pointer-events-auto">
            <img src={brandicon} alt="icon"/>
            <h1>BlogSphere</h1>
        </Link>
        
        <UserAvatar />
    </header>
}