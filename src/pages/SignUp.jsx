import { useState } from "react";
import { Container, Input, Button } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import authService from "../appwrite/authService";
import { login, logout } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

function SignUp() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.isLoggedIn);

  // const createAccount = ({ email, password, firstName, lastName }) => {

  //     authService.getCurrentUser()
  //     .then((data) => {
  //         if (data) {
  //             authService.logout()
  //                 .then(() => {
  //                     console.log("Active session detected and deleted")
  //                 })
  //                 .catch(error => console.log(error))
  //         }
  //     })
  //     .catch(error => console.log(error))

  //     authService.createAccount({ email, password, firstName, lastName })
  //         .then((action) => {
  //             if (action) {
  //                 authService.login({ email, password })
  //                     .then((session) => {
  //                         if (session) {
  //                             authService.getCurrentUser()
  //                                 .then((data) => {
  //                                     dispatch(login({userData: data}));
  //                                 })
  //                                 .catch((error) => setMessage(error.message))
  //                             setSuccess(true)
  //                             setMessage("Successfully created Account!")
  //                             setTimeout(() => navigate("/"), 500)
  //                         }
  //                     })
  //                     .catch((error) => setMessage(error.message))

  //             }
  //         })
  //         .catch((error) => setMessage(error.message))
  // }

  const createAccount = async ({ email, password, firstName, lastName }) => {
    try {

      if (status) {
        try {
          await authService.logout();
          dispatch(logout());
          console.log("Active session detected and deleted");
        } catch (error) {
          setMessage("Error logging out: " + error.message);
          console.error(error);
        }
      }

      try {
        await authService.createAccount({
          email,
          password,
          firstName,
          lastName,
        });

        try {
          await authService.login({ email, password });
          const userData = await authService.getCurrentUser();
          dispatch(login(userData));

          setSuccess(true);
          setMessage("Successfully created account!")

          setTimeout(() => navigate("/"), 500)

        } catch (error) {
          setMessage("Error logging account: " + error.message);
          console.log(error);
        }
      } catch (error) {
        setMessage("Error creating account: " + error.message);
        console.error(error);
      }
    } catch (error) {
      setMessage("Unexpected error: " + error.message);
      console.log(error);
    }
  };

  return (
    <Container className="border-2 rounded-lg p-5 flex">
      <div className="w-[50%] space-y-4 p-[2rem] py-[4rem] border-r-2">
        <h2 className="text-[3.5rem]">Create your account</h2>
        <h3 className="max-w-[28rem] text-xl">
          Sign up to start managing your files and gain access to resources.
        </h3>
      </div>

      <form
        className="w-[50%] py-[8rem] px-[8rem]"
        onSubmit={handleSubmit(createAccount)}
      >
        {message && (
          <div
            className={`w-full mb-[1rem] text-center text-xl ${success ? "text-green-400" : "text-red-400"
              }`}
          >
            {message}
          </div>
        )}

        <div className="w-full flex justify-between">
          <Input
            placeholder="First Name"
            label="First Name"
            {...register("firstName", { required: true })}
          />
          <Input
            placeholder="Last Name"
            label="Second Name"
            {...register("lastName", { required: true })}
          />
        </div>

        <Input
          placeholder="Enter your mail"
          label="Email"
          containerClass="my-[1.25rem]"
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
          placeholder="Enter your password"
          label="Password"
          type="password"
          {...register("password", { required: true, minLength: 8 })}
        />

        <Button type="submit" className="w-full mt-[2.5rem]" text="Sign up" />

        <div className="w-full text-center mt-[1.5rem] flex flex-col ">
          <div className="block border-2 w-[45%] relative top-[1rem]"></div>
          <div className="text-xl text-gray-400">Or</div>
          <div className="block border-2 w-[45%] relative left-[55%] bottom-[0.95rem]"></div>
        </div>

        <Link
          to="/signin"
          className=" text-gray-400 w-full block text-xl text-center mt-[1.5rem]"
        >
          Already have an account? <></>
          <span className="text-black ">Sign in Here!</span>
        </Link>
      </form>
    </Container>
  );
}

export default SignUp;
