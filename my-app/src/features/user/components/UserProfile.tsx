import React from 'react'
import { loggedInUserinfo } from '../userSlice'
import { useSelector } from 'react-redux'

const UserProfile = () => {
  const user = useSelector(loggedInUserinfo)
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

      <div className="my-2 text-base font-medium text-gray-900">
        <p className='text-xl mx-2'>  My Addresses </p>
        {user && user.addresses.map((address) => (
          <ul>
            <li className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
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
          </ul>
        ))}
      </div>
    </div>
  )
}

export default UserProfile