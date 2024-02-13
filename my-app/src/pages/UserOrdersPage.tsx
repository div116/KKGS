import React from 'react'
import UserOrder from '../features/user/components/UserOrder'
import NavBar from '../features/NavBar/NavBar'

const UserOrdersPage = () => {
    return (
        <>
            <NavBar>
                <UserOrder></UserOrder>
            </NavBar>

        </>
    )
}

export default UserOrdersPage
