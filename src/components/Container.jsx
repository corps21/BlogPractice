import { cn } from "@/lib/utils"

function Container({children,className="",props}) {
  return (
    <div className={cn(`w-5/6 lg:w-3/6 mx-auto`,className)} {...props}>
      {children}
    </div>
  )
}

export default Container
