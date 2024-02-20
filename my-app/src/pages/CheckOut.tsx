import React, { useState } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Link, Navigate } from 'react-router-dom'
import { cartItems, removeFromCartAsync, updateCartAsync } from '../features/Cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { addUserAddressAsync, loggedUser } from '../features/Auth/authSlice'
import { currentOrder, placeOrderAsync } from '../features/Orders/Orders/orderSlice'

const CheckOut = () => {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(true)
    const products = useSelector(cartItems);
    const user = useSelector(loggedUser)
    const orders = useSelector(currentOrder)
    console.log("orders", orders)
    const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0)
    const totalItemsInCart = products.reduce((total, product) => total + parseInt(product.quantity), 0)
    const [selectedAddress, setSelectedAddress] = useState(user.addresses[0])
    const [addressIndex, setAddressIndex] = useState(0)
    const [paymentMethod, setPayment] = useState(null)



    const handleQuantity = (e, product) => {
        dispatch(updateCartAsync({ ...product, quantity: e.target.value }) as any)
    }

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCartAsync(product) as any)
    }

    const handleAddress = (event) => {
        setSelectedAddress(user.addresses[event.target.value])
        setAddressIndex(event.target.value)
    }

    const handlePayments = (event) => {
        setPayment(event.target.value)
    }

    const handleOrder = () => {
        let orderInfo = { user, products, selectedAddress, paymentMethod, totalPrice, status : "pending" }
        dispatch(placeOrderAsync(orderInfo) as any)
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm() as any

    return (
        <>
            {orders && <Navigate to={`/order-success/${orders.id}`} />}
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className='lg:col-span-3'>
                        <form className='bg-white px-5 py-5' onSubmit={handleSubmit((data) => {
                            dispatch(
                                addUserAddressAsync({
                                    ...user,
                                    addresses: [...user.addresses, data],
                                }) as any
                            );
                            reset();

                        })}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("name", { required: "Full name is required" })}
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Mobile
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("mobile", { required: "Mobile number is required" })}
                                                    id="last-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register("email", { required: "email is required" })}
                                                    type="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>


                                        <div className="col-span-full">
                                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("streetAddress", { required: "street is required" })}
                                                    id="street-address"
                                                    autoComplete="street-address"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("city", { required: "city is required" })}
                                                    id="city"
                                                    autoComplete="address-level2"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("region", { required: "region is required" })}
                                                    id="region"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register("postalCode", { required: "postal-code is required" })}
                                                    id="postal-code"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-smhover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                                    >
                                        Save Address
                                    </button>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-10 space-y-10">

                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Select Address</legend>


                                            <ul>
                                                {user.addresses.map((address, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                                                    >
                                                        <div className="flex gap-x-4">
                                                        <input
                                                                onChange={handleAddress}
                                                                type="checkbox"
                                                                value={index}
                                                                checked={addressIndex == index}
                                                                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
                                                            />
                                                            <div className="min-w-0 flex-auto">
                                                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                                                    {address.name}
                                                                </p>
                                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                    {address.streetAddress}
                                                                </p>
                                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                                    {address.postalCode}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                            <p className="text-sm leading-6 text-gray-900">
                                                                Phone: {address.mobile}
                                                            </p>
                                                            <p className="text-sm leading-6 text-gray-500">
                                                                {address.city}
                                                            </p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </fieldset>

                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="cash"
                                                        name="payment-methods"
                                                        type="radio"
                                                        value="cash"
                                                        onChange={handlePayments}
                                                        className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-600"
                                                    />
                                                    <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                        COD
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="card"
                                                        name="payment-methods"
                                                        type="radio"
                                                        value="card"
                                                        onChange={handlePayments}
                                                        className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-600"
                                                    />
                                                    <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Card
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="paytm"
                                                        name="payment-methods"
                                                        type="radio"
                                                        value="paytm"
                                                        onChange={handlePayments}
                                                        className="h-4 w-4 border-gray-300 text-teal-600 focus:ring-teal-600"
                                                    />
                                                    <label htmlFor="paytm" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Paytm
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='lg-col-span-2'>
                        <div className="mx-auto mt-12 bg-white max-w-9xl px-2 sm:px-2 lg:px-4">
                            <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
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
                                                                src={product.images[0]}
                                                                alt={product.description}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <p>{product.title}</p>
                                                                    </h3>
                                                                    <p className="ml-4">{`$` + product.price}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
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
                                        <button
                                            type='submit'
                                            onClick={handleOrder}
                                            className="flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700"
                                        >
                                            Place Order
                                        </button>
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
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default CheckOut
