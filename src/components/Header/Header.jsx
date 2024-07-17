import { NavLink, Link , useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import authService from "../../appwrite/authService";
import { login, logout, updateCheckStatus} from "../../store/userSlice";
import Button from "../Button";

function Header() {
  const [buttonInfo,setButtonInfo] = useState({text:"Sign in", route:"/signin"})
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const clickHandler = async () => {
    if (status) {
      const result = await authService.logout()
      if (result) {
        dispatch(logout())
        dispatch(updateCheckStatus(false));
      }
      }
      navigate(buttonInfo.route)
  }

  useEffect(() => {
    status ? setButtonInfo({text:"Logout", route:"/"}) : setButtonInfo({text:"Sign in", route:"/signin"})
  }, [status])

  useEffect(() => {
    if (!status) {
      authService.getCurrentUser().then((data) => {
        if (data) {
          dispatch(login({ userData: data }));
        }
        dispatch(updateCheckStatus(true));
      }).catch((error) => console.log(error))
    }
  }, [dispatch, status])


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

        <Button text={buttonInfo.text} onClick={clickHandler} className="rounded-lg text-lg px-4 py-1 text-white bg-blue-600 hover:bg-white hover:text-blue-600" />
      </div>
    </div>
  )
}

export default Header