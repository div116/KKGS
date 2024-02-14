import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userOrdersInfo, userOrdersInfoAsync } from '../userSlice'
import { UserInfo } from '../userSlice'

const UserOrder = () => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(UserInfo)

    useEffect(() => {
        dispatch((userOrdersInfoAsync(loggedInUser.id)) as any);
    }, [])

    const userOrders = useSelector(userOrdersInfo)

    return (
        <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8 mt-28">
            <h1 className="flex-shrink-0 text-teal-700 text-4xl font-bold mt-10 my-5">
                My Orders
            </h1>
            {userOrders && userOrders.map((order) => (
                <>
                    {order.products.map((product) => (
                        <div>
                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">


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
                                                        <p className="ml-4">{`$` + product.price * product.quantity}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <p className="text-gray-500">Quantity = {product.quantity}</p>

                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div >
                    ))}
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                            <p>Total Order Price</p>
                            <p>${userOrders && order.totalPrice}</p>
                        </div>
                        <div className="flex justify-between my-2text-base font-medium text-gray-900">
                            <p>Payment Method</p>
                            <p>{userOrders && order.paymentMethod}</p>
                        </div>
                    </div>

                    {/* shipping address*/}

                    <div className="my-2 text-base font-medium text-gray-900">
                       <p className='text-xl mx-2'> Shipping Address </p>
                    <ul>
                        <li
                            key={order.id}
                            className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                        >
                            <div className="flex gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                        {order.selectedAddress.name}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                        {order.selectedAddress.streetAddress}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                        {order.selectedAddress.postalCode}
                                    </p>
                                </div>
                            </div>
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">
                                    Phone: {order.selectedAddress.mobile}
                                </p>
                                <p className="text-sm leading-6 text-gray-500">
                                    {order.selectedAddress.city}
                                </p>
                            </div>
                        </li>
                    </ul>
                    </div>
                </>
            ))}
        </div>
    );
}

export default UserOrder
