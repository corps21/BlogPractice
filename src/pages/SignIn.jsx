import { Container, Input, Button } from "../components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/authService";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/userSlice";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Response } from "@/lib/response";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.isLoggedIn);

  const onSubmitHandler = async ({ email, password }) => {
    if (status) {
      const result = await authService.logout();
      if (result) {
        dispatch(logout());
      } else {
        return new Response(false, "Error while removing active session");
      }
    }

    const result = await authService.login({ email, password });

    if (!result) {
      return new Response(false, "Invalid credentials or user not found");
    } else {
      const userData = await authService.getCurrentUser();
      if (userData) {
        dispatch(login({ userData }));
        setTimeout(() => navigate("/"), 500);
        return new Response(true, "Login successful");
      } else {
        return new Response(false, "Error while fetching user data");
      }
    }
  };

  const toastWrapper = async ({ email, password }) => {
    const toastPromise = new Promise((resolve, reject) => {
      onSubmitHandler({ email, password }).then(({ isSuccess, message }) => {
        if (isSuccess) {
          resolve(message);
        } else {
          reject(message);
        }
      });
    });
    toast.promise(toastPromise, {
      loading: "Logging in...",
      success: (message) => message,
      error: (error) => error,
    });
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
          onSubmit={handleSubmit(toastWrapper)}
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
            <a className="cursor-pointer hover:underline absolute right-0 top-0 mt-1 text-sm text-neutral-500 font-medium hover:underline-offset-1 hover:text-neutral-600 hover:font-medium">
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
          <Toaster richColors theme="light" />
          <div className="text-center text-neutral-500 font-normal text-base">
            Don&apos;t have an account?{" "}
            <span className="hover:underline hover:text-neutral-600 hover:font-medium">
              <Link to="/signup">Sign up</Link>
            </span>
          </div>
        </form>
      </Container>
    </section>
  );
}

export default SignIn;
