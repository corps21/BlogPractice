import { Container, Input, Button } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../appwrite/authService";
import { login, logout } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Response } from "@/lib/response";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.isLoggedIn);

  const createAccount = async ({ email, password, firstName, lastName }) => {
    if (status) {
      const result = await authService.logout();
      if(result) dispatch(logout());
      else return new Response(false, "Error while removing active session");
    }

    const isAccountCreated = await authService.createAccount({
      email,
      password,
      firstName,
      lastName,
    });

    if (!isAccountCreated) return new Response(false, "Error while creating account");

    const isAccountLoggedIn = await authService.login({ email, password });
    if(!isAccountLoggedIn) return new Response(false, "Error while logging in");

    const userData = await authService.getCurrentUser();
    if(userData) {
      dispatch(login(userData));
      setTimeout(() => navigate("/"), 500);
      return new Response(true, "Account created successfully");
    }
    else return new Response(false, "Error while fetching user data");
  };

  const toastWrapper = async ({ email, password, firstName, lastName }) => {
    const toastPromise = new Promise((resolve, reject) => {
      createAccount({ email, password, firstName, lastName }).then(({ isSuccess, message }) => {
        if(isSuccess) resolve(message);
        else reject(message);
      });
    });

    toast.promise(toastPromise, {
      loading: "Creating account...",
      success: (message) => message,
      error: (error) => error,
      richColors: true,
    });
  }

  return (
    <section className="flex justify-center items-center h-5/6">
      <Container className="border-[1px] border-gray-700 p-10 rounded-xl md:w-[32rem] w-[24rem]">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Create your account</h2>
          <h3 className="text-base text-gray-500 ">
            Fill in your details to create your account.
          </h3>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(toastWrapper)}
        >
          <div className="flex gap-4 md:flex-row flex-col">
            <Input
              errors={errors}
              registerId="firstName"
              placeholder="First Name"
              label="First Name"
              {...register("firstName", { required: true })}
            />
            <Input
              errors={errors}
              registerId="lastName"
              placeholder="Last Name"
              label="Last Name"
              {...register("lastName", { required: true })}
            />
          </div>

          <Input
            errors={errors}
            registerId="email"
            placeholder="Enter your mail"
            label="Email"
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
            errors={errors}
            registerId="password"
            placeholder="Enter your password"
            label="Password"
            type="password"
            {...register("password", { required: true, minLength: 8 })}
          />

          <Button
            type="submit"
            className="block text-base px-3 py-2 rounded-[6px] mt-2 font-medium"
            text="Sign up"
          />

          <Toaster richColors theme="light"/>

          <div className="text-center text-neutral-500 font-normal text-base">
            Already have an account?{" "}
            <span className="hover:underline">
              <Link to="/signin">Sign in</Link>
            </span>
          </div>
        </form>
      </Container>
    </section>
  );
}

export default SignUp;
