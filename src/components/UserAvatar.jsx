import {useMemo} from "react";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Separator} from "@/components/ui/separator";
import {getDefaultAvatarUrl} from "@/lib/utils";

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {toastPromiseWrapper} from "@/lib/utils";
import {userService} from "@/service/userService";
import {removeAccessToken} from "@/store/authSlice";
import {logout} from "@/store/userSlice";

import {SignOutIcon, SealCheckIcon, BellSimpleIcon, GearSixIcon} from "@phosphor-icons/react";

const toastOptions = {
    loading: "Logging out of the account",
    success: `Logged out`,
    error: (err) => `Something went wrong ( ${err} )`,
    richColors: true,
};

export function UserAvatar() {

    const userData = useSelector((state) => state.user.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOutUser = async (resolve, reject) => {
        const result = await userService.logoutUser();
        if (result.success) {
            resolve();
        } else {
            reject(result.message);
        }
        dispatch(logout());
        dispatch(removeAccessToken());
        navigate("/");
    };

    const MenuItem = [
        {
            name: "Profile",
            href: `/profile/${userData?._id}`,
            icon: SealCheckIcon,
        },
        {
            name: "Notifications",
            href: "/notifications",
            icon: BellSimpleIcon,
            disabled: true
        },
        {
            name: "Settings",
            href: "/settings",
            icon: GearSixIcon,
        }
    ]

    const user = useMemo(
        () => ({
            name: userData?.fullName ?? "John Doe",
            email: userData?.email ?? "johndoe.com",
            avatar:
                userData?.avatarUrl ??
                getDefaultAvatarUrl(userData?.fullName ?? "John Doe"),
        }),
        [userData],
    );


    return userData && (
        <>
            <Separator orientation="vertical" decoration />

            <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full size-6">
                    <Button variant="ghost" className="size-6">

                        <Avatar className="size-6">
                            <AvatarImage src={user.avatar} alt={user.name ?? "John Doe"} />
                            <AvatarFallback className="">JD</AvatarFallback>
                        </Avatar>

                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">

                    <DropdownMenuGroup>

                        <DropdownMenuLabel>
                            My Account
                        </DropdownMenuLabel>

                        {MenuItem.map((item) => (
                            <DropdownMenuItem key={item.name} className="cursor-pointer" onClick={() => navigate(item.href)} disabled={item?.disabled}>
                                <item.icon className="size-4" weight="bold" />
                                {item.name}
                            </DropdownMenuItem>
                        ))}

                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => toastPromiseWrapper(logOutUser, toastOptions)} className="cursor-pointer">
                            <SignOutIcon className="size-4" weight="bold" />
                            <span className="">Sign out</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}