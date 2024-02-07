import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Protected from "./features/Auth/Components/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected> <Home></Home></Protected>
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>
  },
  {
    path: "/cart",
    element: <Protected> <CartPage></CartPage> </Protected>
  },
  {
    path: "/checkout",
    element: <Protected> <CheckOut></CheckOut></Protected>
  },
  {
    path: "/product-details/:id",
    element: <Protected> <ProductDetailsPage></ProductDetailsPage></Protected>
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
