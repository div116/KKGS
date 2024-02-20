import React, { useEffect, useState } from 'react'
import {
    PencilIcon,
    EyeIcon,
    ArrowUpIcon,
    ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { Items_Per_Page , discountedPrice} from "../../../app/constant";
import Pagination from '../../common/Pagination';
import { fetchAllOrdersAsync, orders, selectTotalOrders, updateOrderAsync } from '../../Orders/Orders/orderSlice';

const AdminOrders = () => {
    interface SortState {
        _order: string;
        _sort: string;
      }
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const selectedorders = useSelector(orders);
    const totalOrders = useSelector(selectTotalOrders);
    const [editableOrderId, setEditableOrderId] = useState(-1);
    const [sort, setSort] = useState<SortState>({_order: 'asc', _sort: 'id'});

    const handleEdit = (order) => {
        setEditableOrderId(order.id);
    };
    const handleShow = (order) => {
        console.log('handleShow');
    };

    const handleUpdate = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value };
        dispatch(updateOrderAsync(updatedOrder) as any);
        setEditableOrderId(-1);
    };

    const handlePage = (page) => {
        setPage(page);
    };

    const handleSort = (sortOption) => {
        const sort = { _sort: sortOption.sort, _order: sortOption.order };
        setSort(sort);
    };

    const chooseColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-purple-200 text-purple-600';
            case 'dispatched':
                return 'bg-yellow-200 text-yellow-600';
            case 'delivered':
                return 'bg-green-200 text-green-600';
            case 'cancelled':
                return 'bg-red-200 text-red-600';
            default:
                return 'bg-purple-200 text-purple-600';
        }
    };

    useEffect(() => {
        const pagination = { _page: page,  _per_page: Items_Per_Page };
        dispatch(fetchAllOrdersAsync({ sort, pagination }) as any);
    }, [dispatch, page, sort]);


    return (
        <div className="overflow-x-auto">
            <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
                <div className="w-full">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th
                                        className="py-3 px-6 text-left cursor-pointer"
                                        onClick={(e) =>
                                            handleSort({
                                                sort: 'id',
                                                order: sort?._order === 'asc' ? 'desc' : 'asc',
                                            })
                                        }
                                    >
                                        Order# {' '}
                                        {sort?._sort === 'id' &&
                                            (sort?._order === 'asc' ? (
                                                <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                                            ) : (
                                                <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                                            ))}
                                    </th>
                                    <th className="py-3 px-6 text-left">Items</th>
                                    <th
                                        className="py-3 px-6 text-left cursor-pointer"
                                        onClick={(e) =>
                                            handleSort({
                                                sort: 'totalAmount',
                                                order: sort?._order === 'asc' ? 'desc' : 'asc',
                                            })
                                        }
                                    >
                                        Total Amount {' '}
                                        {sort._sort === 'totalAmount' &&
                                            (sort._order === 'asc' ? (
                                                <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                                            ) : (
                                                <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                                            ))}
                                    </th>
                                    <th className="py-3 px-6 text-center">Shipping Address</th>
                                    <th className="py-3 px-6 text-center">Status</th>
                                    <th className="py-3 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {selectedorders && selectedorders.map((order) => (
                                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2"></div>
                                                <span className="font-medium">{order.id}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {order?.products.map((item) => (
                                                <div className="flex items-center">
                                                    <div className="mr-2">
                                                        <img
                                                            className="w-6 h-6 rounded-full"
                                                            src={item.thumbnail}
                                                        />
                                                    </div>
                                                    <span>
                                                        {item.title} - #{item.quantity} - $
                                                        {discountedPrice(item)}
                                                    </span>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center">
                                                ${order.totalPrice}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="">
                                                <div>
                                                    <strong>{order?.selectedAddress?.name}</strong>,
                                                </div>
                                                <div>{order?.selectedAddress?.streetAddress},</div>
                                                <div>{order?.selectedAddress?.city}, </div>
                                                <div>{order?.selectedAddress?.region}, </div>
                                                <div>{order?.selectedAddress?.postalCode}, </div>
                                                <div>{order?.selectedAddress?.mobile}, </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {order.id === editableOrderId ? (
                                                <select onChange={(e) => handleUpdate(e, order)}>
                                                    <option value="pending">Pending</option>
                                                    <option value="dispatched">Dispatched</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            ) : (
                                                <span
                                                    className={`${chooseColor(
                                                        order.status
                                                    )} py-1 px-3 rounded-full text-xs`}
                                                >
                                                    {order.status}
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                                                    <EyeIcon
                                                        className="w-8 h-8"
                                                        onClick={(e) => handleShow(order)}
                                                    ></EyeIcon>
                                                </div>
                                                <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                                                    <PencilIcon
                                                        className="w-8 h-8"
                                                        onClick={(e) => handleEdit(order)}
                                                    ></PencilIcon>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Pagination
                page={page}
                setPage={setPage}
                handlePage={handlePage}
                totalItems={totalOrders}
            ></Pagination>
        </div>
    )
}

export default AdminOrders
