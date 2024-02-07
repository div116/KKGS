import {User} from "../authSlice"
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
    const user = useSelector(User)
    if(!user) {
        return <Navigate to="/login" replace={true}></Navigate>
    }

    return children;
}

export default Protected
