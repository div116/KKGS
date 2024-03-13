import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { cartItems, removeFromCartAsync, updateCartAsync } from './cartSlice';

const Cart = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(true)
  const products = useSelector(cartItems);
  const totalPrice = products.reduce((total, product) => total + product.product.price * product.quantity, 0)
  const totalItemsInCart = products.reduce((total, product) => total + parseInt(product.quantity), 0)

  const handleQuantity = (e, product) => {
    dispatch(updateCartAsync({ id: product.id, quantity: e.target.value }) as any)
  }

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCartAsync(product) as any)
  }

  return (
    <>
      <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8 mt-28">
        <h1 className="flex-shrink-0 text-teal-700 text-4xl font-bold mt-10 my-5">
          Cart
        </h1>
        <div>
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.product.thumbnail}
                        alt={product.product.description}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <p>{product.title}</p>
                          </h3>
                          <p className="ml-4">{`$` + product.product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{product.product.brand}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Qty
                          <select value={product.quantity} className='ml-5' onChange={(e) => handleQuantity(e, product)}>
                            {/* You can generate options dynamically based on your use case */}
                            {[1, 2, 3, 4, 5, 6].map((option) => (
                              <option key={option} value={option} >
                                {option}
                              </option>
                            ))}
                          </select>
                        </p>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-teal-600 hover:text-teal-700"
                            onClick={() => handleRemoveFromCart(product)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div >

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalPrice}</p>
          </div>
          <div className="flex justify-between my-2text-base font-medium text-gray-900">
            <p>Total Item in Cart</p>
            <p>{totalItemsInCart} Items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            {products.length > 0 ? (
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700"
              >
                Checkout
              </Link>
            ) : (
              <button
                className=" w-full flex items-center justify-center rounded-md border border-transparent bg-gray-300 px-6 py-3 text-base font-medium text-gray-500 shadow-sm cursor-not-allowed"
                disabled >
                Checkout
              </button>
            )}
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{' '}
              <Link
                to="/"
                className="font-medium text-teal-600 hover:text-teal-700"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )

}

export default Cart
