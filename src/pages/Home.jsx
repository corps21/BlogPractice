import { useSelector } from "react-redux"
import { Container } from "../components";

function Home() {
  const status = useSelector((state) => state.auth.isLoggedIn);

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
