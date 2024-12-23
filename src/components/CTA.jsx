import { Container,Button} from "../components";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <Container className={`text-center my-[12rem]`}>
      <div className="text-[4rem] font-bold uppercase leading-[1.125]">
        <div className="">Sign Up</div>
        <div>To See Posts</div>
      </div>
      <Link className="text-[1.25rem] font-medium flex items-center justify-center" to="/signin">
          <Button text="Sign in"/>
        </Link>
    </Container>
  )
}
