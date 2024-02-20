import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
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
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilepage from "./pages/UserProfilepage";
import { loggedInUserInfoAsync } from "./features/user/userSlice";
import LogOut from "./features/Auth/Components/LogOut";
import ForgotPassword from "./features/Auth/Components/ForgotPassword";
import ProtectedAdmin from "./features/Auth/Components/ProtectedAdmin";
import AdminHomepage from "./pages/AdminPages/AdminHomepage";
import AdminProductDetailsPage from "./pages/AdminPages/AdminProductDetailsPage";
import AdminProductFormPage from "./pages/AdminPages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminPages/AdminOrdersPage";

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
  },
  {
    path: "/orders",
    element: <Protected><UserOrdersPage></UserOrdersPage></Protected>
  },
  {
    path: "/user-profile",
    element: <Protected><UserProfilepage></UserProfilepage></Protected>
  },
  {
    path: "/log-out",
    element: <Protected><LogOut></LogOut></Protected>
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword></ForgotPassword>
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHomepage></AdminHomepage></ProtectedAdmin>
  },
  {
    path: "/admin/product-details/:id",
    element: <ProtectedAdmin> <AdminProductDetailsPage></AdminProductDetailsPage></ProtectedAdmin>
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin> <AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin> <AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin> <AdminOrdersPage></AdminOrdersPage></ProtectedAdmin>
  },

]);

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(loggedUser)
  useEffect(() => {
    if (user) {
      dispatch((getCartItemsByUserAsync(user.id)) as any)
      dispatch((loggedInUserInfoAsync(user.id)) as any)
    }
  }, [dispatch, user])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App