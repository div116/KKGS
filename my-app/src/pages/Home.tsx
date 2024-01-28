import React from 'react'
import NavBar from '../features/NavBar/NavBar'
import { ProductList } from '../features/Product/Components/ProductList'

const Home = () => {
  return (
    <>
    <NavBar>
        <ProductList></ProductList>
    </NavBar>
      
    </>
  )
}

export default Home
