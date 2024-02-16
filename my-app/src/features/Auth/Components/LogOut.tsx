import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loggedUser, signOutUserAsync } from '../authSlice'
import { Navigate } from 'react-router-dom'

const LogOut = () => {
    const user = useSelector(loggedUser)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(signOutUserAsync() as any)
    },[])

  return (
    <>
      {!user && <Navigate to="/login"></Navigate>}
    </>
  )
}

export default LogOut
