/* eslint-disable react/prop-types */
import { Container } from "../components";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { LogInIcon, VenetianMaskIcon } from "lucide-react";
import authService from "@/appwrite/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/store/userSlice";

export default function CTA({ text = "To See Posts" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Container className={`h-5/6 flex flex-col justify-center items-center`}>
      <div className=" text-center text-4xl font-bold uppercase leading-[1.125] mb-4">
        <div>Sign Up</div>
        <div>{text}</div>
      </div>
      <Button asChild className="rounded-[4px] bg-blue-700 mb-2">
        <Link className="" to="/signin">
          <LogInIcon />
          Sign In
        </Link>
      </Button>
      <Button
        asChild
        variant="secondary"
        onClick={async () => {
          const result = await authService.createAnonUser();
          if (result) {
            navigate("/")
            dispatch(login({ userData:result}));
          }
        }}
      >
        <Link className="cursor-pointer hover:underline text-sm font-medium text-neutral-500">
          <VenetianMaskIcon />
          Use Without Signing In
        </Link>
      </Button>
    </Container>
  );
}
