import { Container} from "../components";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { LogInIcon } from "lucide-react";
export default function CTA() {
  return (
    <Container className={`h-5/6 flex flex-col justify-center items-center gap-6`}>
      <div className=" text-center text-4xl font-bold uppercase leading-[1.125]">
        <div>Sign Up</div>
        <div>To See Posts</div>
      </div>
      <Button asChild className="rounded-[4px] bg-blue-700">
        <Link className="" to="/signin">
          <LogInIcon />
          Sign In
        </Link>
      </Button>
    </Container>
  )
}
