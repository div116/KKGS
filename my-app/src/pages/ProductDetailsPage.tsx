import React from 'react'
import ProductDetails from '../features/Product/Components/ProductDetails'
import NavBar from '../features/NavBar/NavBar'

const ProductDetailsPage = () => {
    return (
        <>
            <NavBar>
                <ProductDetails></ProductDetails>
            </NavBar>
        </>
    )
}

export default ProductDetailsPage
