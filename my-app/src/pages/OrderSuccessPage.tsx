import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCartAsync } from '../features/Cart/cartSlice'
import { loggedUser } from '../features/Auth/authSlice'
import { clearCurrentOrder } from '../features/Orders/counter/orderSlice'

const OrderSuccessPage = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const user = useSelector(loggedUser)

  useEffect(() => {
    dispatch(clearCartAsync(user.id) as any)
    dispatch(clearCurrentOrder() as any)
  },[])

  return (
    <>
      {params ?
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-teal-600">{params.id}</h2>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order Placed Successfully for {params.id}</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Thanks For Shopping</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/" className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        : null}
    </>
  )
}

export default OrderSuccessPage