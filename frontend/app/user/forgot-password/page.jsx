"use client"
import { findMyAccount } from '@/app/api/UserAPI'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
// backend url
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL


const password_reset = () => {
    const [username, setUsername] = useState('')
    // use router 
    const router = useRouter()

    // handle submit button
    const handleSubmit = (e) => {
        e.preventDefault()
        findMyAccount({ username }, backendUrl,)
            .then(data => {
                if (data?.success) {
                    // show the alert, reset password link is send to your mail
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: data.success,
                        showConfirmButton: false,
                        timer: 3000
                    });
                    // clear the input filed after success
                    setUsername('')
                    router.push("/login")



                }
            })
            .catch(error => console.log("error", error))
    }
    // handle change for controlled input
    const handleChange = (e) => {
        setUsername(e.target.value)


    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="/logo.jpg"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Reset Your Password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}
                    method="POST">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-900"
                        >
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm pl-1"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Find Your Account
                        </button>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default password_reset