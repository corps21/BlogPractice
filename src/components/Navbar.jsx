import { NavLink, Link } from "react-router-dom";

import { UserAvatar } from "@/components/UserAvatar";
import { MagnifyingGlassIcon, PlusIcon } from "@phosphor-icons/react";
import { Separator } from "@/components/ui/separator";

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

    return <header className="flex items-center justify-between gap-4 p-6">

        <section className="flex items-center gap-2">
            {sections.map((section) => (
                <NavLink
                    to={section.href}
                    key={section.title}
                    className={({ isActive }) => `text-sm font-medium flex items-center cursor-pointer pointer-events-auto px-3 py-1 hover:bg-secondary rounded-lg ${isActive ? "bg-secondary" : ""}`}
                >
                    {section.title}
                </NavLink>
            ))}

            {/* <Separator orientation="vertical" /> */}

            {/* Saved Sections */}

            <Separator orientation="vertical" decoration />

            <span className="flex items-center cursor-pointer p-1 hover:bg-secondary rounded-md">
                <Link to="/posts/create">
                    <PlusIcon weight="bold" className="size-4" />
                </Link>
            </span>

        </section>

        <section className="flex items-center gap-2">
            <Link to="/search" className="flex items-center hover:bg-secondary rounded-md p-1">
                <MagnifyingGlassIcon className="size-5" weight="bold" />
            </Link>

            <Separator orientation="vertical" decoration />

            <UserAvatar />
        </section>
    </header>
}