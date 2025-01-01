import { Container, Input, Button, Message} from "../components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/authService";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/userSlice";

function SignIn() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: {errors} } = useForm();
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
    <section className="flex justify-center items-center h-5/6">
      <Container className="border-[1px] border-gray-700 p-8 rounded-xl w-[24rem]">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Login</h2>
          <h3 className="text-base text-gray-500 ">
            Enter your email to login to your account
          </h3>
        </div>

        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="flex flex-col gap-4"
        >
          <Input
            label="Email"
            errors={errors}
            registerId="email"
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
          <div className="relative">
            <a className="cursor-pointer hover:underline absolute right-0 top-0 mt-1 text-sm text-neutral-500 font-medium hover:underline-offset-1">
              Forgot your password?
            </a>
            <Input
              errors={errors}
              registerId="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true, minLength: 8 })}
            />
          </div>
          <Button
            type="submit"
            className="block text-base px-3 py-2 rounded-[6px] mt-2 font-medium"
            text="Login"
          />
          {message && (
            <Message isSuccess={success} message={message}/>
          )}
          <div className="text-center text-neutral-500 font-normal text-base">
            Don&apos;t have an account?{" "}
            <span className="hover:underline">
              <Link to="/signup">
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </Container>
    </section>
  );
}

export default SignIn;
