import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Menu, NotebookPen, Plus, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { getDefaultAvatarUrl } from "@/lib/utils";

const navItems = [
    { label: "Home", to: "/", icon: Home },
    { label: "All Posts", to: "/posts", icon: NotebookPen },
    { label: "Create Post", to: "/posts/create", icon: Plus },
    { label: "Search", to: "/search", icon: Search },
];

export function Navbar() {
    const user = useSelector((state) => state.user.userData);
    const displayName = user?.fullName || user?.userName || "Guest";
    const avatarUrl = user?.avatarUrl || getDefaultAvatarUrl(displayName);

    return (
        <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <nav className="hidden items-center gap-1 md:flex">
                    {navItems.map(({ label, to, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                [
                                    "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                ].join(" ")
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className="size-4" />
                                    <span>{label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="size-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[85vw] max-w-sm sm:w-[320px]">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <div className="mt-4 flex flex-col gap-2">
                                <div className="mb-3 flex items-center gap-3 rounded-lg border border-border/70 bg-muted/40 p-3">
                                    <Avatar size="sm" className="ring-2 ring-background">
                                        <AvatarImage src={avatarUrl} alt={displayName} />
                                        <AvatarFallback>{displayName?.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium leading-none">{displayName}</span>
                                        <span className="text-xs text-muted-foreground">Signed in</span>
                                    </div>
                                </div>

                                {navItems.map(({ label, to, icon: Icon }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        className={({ isActive }) =>
                                            [
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                                                isActive
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                            ].join(" ")
                                        }
                                    >
                                        <Icon className="size-4" />
                                        <span>{label}</span>
                                    </NavLink>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}