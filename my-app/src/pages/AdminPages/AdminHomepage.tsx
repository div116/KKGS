import React from 'react'
import NavBar from '../../features/NavBar/NavBar'
import { AdminProductList } from '../../features/Admin/Components/AdminProductList'

const AdminHomepage = () => {
    return (
        <>
            <NavBar>
                <AdminProductList></AdminProductList>
            </NavBar>
        </>
    )
}

export default AdminHomepage
