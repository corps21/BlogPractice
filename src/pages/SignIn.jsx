import { Container, Input, Button } from "../components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/authService";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/userSlice";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Response } from "@/lib/response";
import { cn } from "@/lib/utils";

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
    <section className="my-[3rem] md:my-auto">
      <Container className="border-[1px] border-border p-8 rounded-xl md:w-[28rem] shadow-md">
        <div className="mb-6 dark:text-white space-y-2">
          <h2 className={"text-xl font-bold"}>Login</h2>
          <h3 className="text-sm text-muted-foreground">
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
            className="text-sm"
          />
          <Input
            errors={errors}
            registerId="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true, minLength: 8 })}
            className="text-sm"
          />
          <Button
            type="submit"
            className="block text-sm px-3 py-2 rounded-[6px] mt-2 font-medium "
            text="Login"
          />
          <Link className="cursor-pointer text-center underline text-sm text-muted-foreground">
            Forgot your password?
          </Link>
          <div className="text-center text-muted-foreground text-sm">
            Don&apos;t have an account?{" "}
            <span className="hover:underline hover:text-neutral-600 hover:font-medium">
              <Link to="/signup" className="underline font-semibold">Sign up</Link>
            </span>
          </div>
        </form>
      </Container>
      <Toaster richColors theme="light" />
    </section>
  );
}

export default SignIn;
