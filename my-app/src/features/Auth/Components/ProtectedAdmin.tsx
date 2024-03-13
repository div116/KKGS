import { loggedUser} from "../authSlice"
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedAdmin = ({children}) => {
    const user = useSelector(loggedUser)
    if(!user) {
        return <Navigate to="/login" replace={true}></Navigate>
    }
    if (user && user.role!=='admin') {
        return <Navigate to="/" replace={true}></Navigate>;
      }

    return children;
}

export default ProtectedAdmin