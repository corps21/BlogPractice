import { cn } from "@/lib/utils"

function Container({children,className="",props}) {
  return (
    <div className={cn(`w-11/12 md:w-5/6 mx-auto`,className)} {...props}>
      {children}
    </div>
  )
}

export default Container
