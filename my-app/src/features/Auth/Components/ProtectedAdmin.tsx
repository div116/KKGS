import { loggedUser} from "../authSlice"
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { UserInfo } from "../../user/userSlice"

const ProtectedAdmin = ({children}) => {
    const user = useSelector(loggedUser)
    const loggedUserdata = useSelector(UserInfo)
    if(!user) {
        return <Navigate to="/login" replace={true}></Navigate>
    }
    if (user && loggedUserdata.role!=='admin') {
        return <Navigate to="/" replace={true}></Navigate>;
      }

    return children;
}

export default ProtectedAdmin