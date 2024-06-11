import { useSelector } from "react-redux"
import { Container } from "../components";
import { useEffect } from "react";
import authService from "../appwrite/authService";
import { login } from "../store/userSlice";
import { useDispatch } from "react-redux";

function Home() {
  const status = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!status) {
      authService.getCurrentUser()
        .then(data => data ? dispatch(login({ userData: data })) : null)
    }
  },[])

  return (
    <>
      <Container className="flex justify-end">
        {!status && (
          <div className="text-9xl uppercase py-10 text-right flex flex-col justify-center">
            <div>Sign Up</div>
            <div>To See Posts</div>
          </div>
        )}

        {status && (
          <div className="text-9xl uppercase py-10 text-right flex flex-col justify-center">
            <div>Signed Up</div>
            <div>Can See Posts</div>
          </div>
        )}

      </Container>
    </>
  )
}

export default Home
