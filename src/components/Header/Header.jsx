import { NavLink, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import authService from "../../appwrite/authService";
import { login, logout } from "../../store/userSlice";

function Header() {

  const [linkTest, setLinkText] = useState("Sign in")
  const [btnroute, setBtnRoute] = useState("/signin")

  const status = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const logOutHandler = () => {
    if (status) {
      authService.logout().then((data) => {
        if (data) {
          dispatch(logout())
        }
      })
    }
  }

  useEffect(() => {
    if (status) {
      setLinkText("Logout")
      setBtnRoute("/")
    } else {
      setLinkText("Sign in")
      setBtnRoute("/signin")
    }
  }, [status])

  useEffect(() => {
    if(!status) {
      authService.getCurrentUser().then((data) => {
        if (data) {
          dispatch(login({ userData: data }));
        }
      }).catch((error) => console.log(error))
    }
  },[])


  const navItems = [
    {
      name: "Home",
      url: "/",
      active: status
    },
    {
      name: "All posts",
      url: "/all-post",
      active: status
    },
    {
      name: "Add post",
      url: "/add-post",
      active: status
    },
  ]



  return (
    <div className="w-5/6 mx-auto my-2 flex items-center justify-between  py-6">
      <Link to="/" className="text-3xl">BlogSphere</Link>
      <div className="flex space-x-5 items-center">
        {navItems.map((item) => (
          <NavLink key={item.name} className={({ isActive }) => `text-xl hover:underline underline-offset-8 ${isActive ? "text-blue-600 font-semibold underline decoration-2" : ""} ${!status ? "invisible" : ""}`} to={item.url}>{item.name}</NavLink>
        ))}

        <Link onClick={logOutHandler} className="rounded-lg text-lg px-4 py-1 text-white bg-blue-600 hover:bg-white hover:text-blue-600" to={btnroute}>{linkTest}</Link>

      </div>
    </div>
  )
}

export default Header