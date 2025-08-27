import { ModeToggle } from "@/components"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="dark:bg-background dark:text-secondary-foreground h-screen">
            <div className="w-5/6 h-5/6 lg:w-3/6  mx-auto relative flex justify-center items-center">
                <div className="absolute right-0 top-3">
                    <ModeToggle />
                </div>
                <div className="leading-[1] flex flex-col">
                    <h1 className="text-[10rem] md:text-[16rem] font-semibold">404</h1>
                    <p className="capitalize text-lg md:text-2xl font-bold text-center mb-5">Page not found</p>
                    <Button variant="outline" className="capitalize mx-auto md:font-semibold">
                        <Link to="/">
                            Go Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
