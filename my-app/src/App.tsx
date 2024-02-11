import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Protected from "./features/Auth/Components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCartItemsByUserAsync } from "./features/Cart/cartSlice";
import { loggedUser } from "./features/Auth/authSlice";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccessPage from "./pages/OrderSuccessPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home></Home></Protected>
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
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>
  },
  {
    path: "/order-success/:id",
    element: <Protected><OrderSuccessPage></OrderSuccessPage></Protected>
  }
]);

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(loggedUser)
  useEffect(() => {
    if(user) {
      dispatch((getCartItemsByUserAsync(user.id)) as any)
    }
  },[dispatch, user])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App