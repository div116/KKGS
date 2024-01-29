import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import ProductDetailsPage from "./pages/ProductDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>
  },
  {
    path: "/login",
    element:<LoginPage></LoginPage>
  },
  {
    path: "/signup",
    element:<SignUpPage></SignUpPage>
  },
  {
    path: "/cart",
    element: <CartPage></CartPage>
  },
  {
    path: "/checkout",
    element: <CheckOut></CheckOut>
  },
  {
    path: "/product-details",
    element: <ProductDetailsPage></ProductDetailsPage>
  }
]);

const App = () => {
  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
