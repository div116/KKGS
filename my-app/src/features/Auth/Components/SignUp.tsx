import { Link, Navigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { User, createUserAsync } from "../authSlice"
import { useDispatch, useSelector } from "react-redux"
const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm() as any

  const user = useSelector(User)
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    let userdata = {
      email: data.email,
      password: data.password,
      addresses:[],
      role: "user" 
    }
    dispatch(createUserAsync(userdata) as any)
  }

  return (
    <>
      {user && <Navigate to="/"></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center text-3xl text-teal-600 font-bold">
          Khandelwals
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create A New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", { required: true, pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" } })}

                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500">{errors?.email?.message}</p>
              </div>

            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", { required: true, pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Enter a valid password" } })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500">{errors?.password?.message}</p>
              </div>

            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  {...register("confirmPassword", { required: true, validate: (value) => value === watch("password"), pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Password Did Not Match" } })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                />
                <p className="text-red-500">{errors?.confirmPassword?.message}</p>
              </div>

            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-smhover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to="/login" className="font-semibold leading-6 text-teal-600 hover:text-teal-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUp
