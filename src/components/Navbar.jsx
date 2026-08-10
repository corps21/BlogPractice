import {NavLink, Link} from "react-router-dom";

import {UserAvatar} from "@/components/UserAvatar";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

const sections = [
    {
        title: "Home",
        href: "/"
    }, {
        title: "Archive",
        href: "/archive",
    }
]

export function Navbar() {

    return <header className="flex items-center justify-around gap-4 py-3">

        <section className="flex items-center gap-2">
            {sections.map((section) => (
                <>
                    <NavLink
                    to={section.href}
                    key={section.title}
                    className={({ isActive }) => `text-sm font-medium flex items-center gap-1 cursor-pointer pointer-events-auto px-3 py-1 hover:bg-secondary rounded-lg ${isActive ? "bg-secondary" : ""}`}
                    >

                        {section.title}
                    </NavLink>
                </>
            ))}
        </section>

        <section className="flex items-center gap-4">
            <Link to="/search">
                <MagnifyingGlassIcon className="size-5" weight="bold" />
            </Link>

            <UserAvatar />
        </section>
    </header>
}