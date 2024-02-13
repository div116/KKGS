import React from 'react'
import NavBar from '../features/NavBar/NavBar'
import UserProfile from '../features/user/components/UserProfile'

const UserProfilepage = () => {
    return (
        <>
            <NavBar>
                <UserProfile></UserProfile>
            </NavBar>
        </>
    )
}

export default UserProfilepage
