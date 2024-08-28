import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "../buttons/PrimaryButton/PrimaryButton";
import { logout } from "../../features/auth/authActions";
import { Navigate } from "react-router-dom";

const DashBoard = () => {
  const user = useSelector(state => state.auth.value)
  const dispatch = useDispatch();

  if (!user.isAuthenticated) return <Navigate to='/login'/>
  return (
    <div>
      <h1>Hello, </h1>
      <PrimaryButton text='Logout' onClick={() => dispatch(logout())}/>
    </div>
  )
}

export default DashBoard;