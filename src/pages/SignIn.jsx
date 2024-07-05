import { Container, Input, Button } from "../components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/authService";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/userSlice";

function SignIn() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.isLoggedIn);

  const onSubmitHandler = async ({ email, password }) => {
    setMessage("");
    setSuccess(false);
    try {
      if (status) {
        try {
          const result = await authService.logout();
          if (result) {
            dispatch(logout());
            console.log("Active session detected and removed");
          } else setMessage("Something went wrong");
        } catch (error) {
          console.log(error);
        }
      }

      try {
        const result = await authService.login({ email, password });

        if (!result) {
          setMessage("Something went wrong");
          return;
        } else {
          const userData = await authService.getCurrentUser();
          dispatch(login({ userData }));
          if (userData) {
            setSuccess(true);
            setMessage("Successfully Signed in!");
            setTimeout(() => navigate("/"), 500);
          } else {
            setMessage("Something went wrong");
          }

        }
      } catch (error) {
        setMessage("Error logging in: " + error.message);
        console.log(error);
      }
    } catch (error) {
      setMessage("Unexpected error: " + error.message);
      console.log(error);
    }
  };

  return (
    <Container className="border-2 rounded-lg p-5 flex">
      <div className="w-[50%] space-y-4 p-[2rem] py-[4rem] border-r-2">
        <h2 className="text-[3.5rem]">Login to your account</h2>
        <h3 className="max-w-[28rem] text-xl">
          Please login to access your files and get access to resources.
        </h3>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-[50%] py-[8rem] px-[8rem]"
      >

        {message && (
          <div
            className={`w-full mt-[1.5rem] text-center text-xl ${success ? "text-green-600" : "text-red-600"
              }`}
          >
            {message}
          </div>
        )}

        <Input
          label="Email"
          placeholder="Enter your mail"
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          containerClass="mt-[1.5rem] mb-[2.5rem]"
          {...register("password", { required: true, minLength: 8 })}
        />

        <Button
          type="submit"
          className="w-full space-y-20"
          text="Sign in to account"
        />

        <a className="inline-block text-[1.35rem] text-gray-400 text-center mt-[1.5rem] cursor-pointer w-full hover:text-gray-500">
          Forgot your password?{" "}
        </a>

        <div className="w-full text-center mt-[1.5rem] flex flex-col ">
          <div className="block border-2 w-[45%] relative top-[1rem]"></div>
          <div className="text-xl text-gray-400">Or</div>
          <div className="block border-2 w-[45%] relative left-[55%] bottom-[0.95rem]"></div>
        </div>

        <Link
          to="/signup"
          className=" text-gray-400 w-full block text-xl text-center mt-[1.5rem]"
        >
          Don&apos;t have an account? <></>
          <span className="text-black ">Sign Up Now!</span>
        </Link>
      </form>
    </Container>
  );
}

export default SignIn;
