import React, { useState } from 'react'
import { UserInfo, updateUserAsync } from '../userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { addUserAddressAsync } from '../../Auth/authSlice'

const UserProfile = () => {
  const user = useSelector(UserInfo)
  const dispatch = useDispatch()

  const handleRemove = (index) => {
    let updateUser = { ...user, addresses: [...user.addresses] }
    updateUser.addresses.splice(index, 1)
    dispatch(updateUserAsync(updateUser) as any)
  }
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm() as any

  const handleAddress = (index) => {
    setSelectedAddress(user.addresses[index])
    setAddressIndex(index)
  }

  const [addressIndex, setAddressIndex] = useState(0)
  const [selectedAddress, setSelectedAddress] = useState(user.addresses[0])

  return (

    <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8 mt-28">
      <h1 className="flex-shrink-0 text-teal-700 text-4xl font-bold mt-10 my-5">
        My Profile
      </h1>
      <div>
        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              <li key={user.id} className="flex py-6">
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <p>Login Id :   {user.id}</p>
                      </h3>
                      <p className="ml-4"> email : {user.email}</p>
                    </div>
                  </div>

                </div>
              </li>

            </ul>
          </div>
        </div>
      </div >

      {/* Address Form for Edit */}
      {user.addresses.length > 0 &&
        <>
          <form className='bg-white px-5 py-5'
            onSubmit={handleSubmit((data) => {
              console.log("data form", data)
              const updatedAddresses = [...user.addresses];
              updatedAddresses[addressIndex] = data;
              dispatch(
                addUserAddressAsync({
                  ...user,
                  addresses: updatedAddresses,
                }) as any
              );
              reset();
              console.log("updated Address", data)


            })}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Personal Information</h2>
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
                        value={selectedAddress.name}
                        onChange={(e) => setSelectedAddress({ ...selectedAddress, name: e.target.value })}
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
                        value={selectedAddress.mobile}
                        onChange={(e) => setSelectedAddress({ ...selectedAddress, mobile: e.target.value })}
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
                        value={selectedAddress.email}
                        onChange={(e) => setSelectedAddress({ ...selectedAddress, email: e.target.value })}
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
                        value={selectedAddress.streetAddress}
                        onChange={(e) => setSelectedAddress({ ...selectedAddress, streetAddress: e.target.value })}
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
                        value={selectedAddress.city}
                        onChange={(e) => setSelectedAddress({ ...selectedAddress, city: e.target.value })}
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
                        value={selectedAddress.region}
                        onChange={(e) => setSelectedAddress({ ...selectedAddress, region: e.target.value })}
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
                        value={selectedAddress.postalCode}
                        onChange={(e) => setSelectedAddress({ ...selectedAddress, postalCode: e.target.value })}
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
                  Update Address
                </button>
              </div>
            </div>
          </form>

          <div className="my-2 p-7 text-base font-medium text-gray-900">
            <p className='text-xl mx-2'>  My Addresses </p>
            {user && user.addresses.map((address, index) => (
              <ul>
                <li key={index} className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                  <div className="flex gap-x-4">
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
                      <button type='button' className="bg-teal-600 text-white px-4 py-2 rounded" onClick={() => handleAddress(index)}>
                        Edit
                      </button>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {address.mobile}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {address.city}
                    </p>
                    <button type='button' className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => handleRemove(index)}>
                      Delete
                    </button>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </>}
    </div>
  )
}

export default UserProfile