'use client'
import React, { useState } from 'react';
import Link from "next/link";
import { loginEmployer } from '../../api/EmployerAPI';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

// environment variable
const backend = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL

const Page = () => {
    const router = useRouter()
    const [formValue, setformValue] = useState({
        username: "",
        password: ""
    })

    // validate 
    const validate = () => {
        const newErrors = { email: "", password: "" };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log(formValue.email)
        console.log(formValue.password)

        if (!formValue.email.toString().trim()) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(formValue.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!formValue.password.toString().trim()) {
            newErrors.password = "Password is required.";
        } else if (formValue.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        setError(newErrors);
        return !Object.values(newErrors).some((error) => error);
    }

    // handle change
    const handleChange = (e) => {
        const { name, value } = e.target
        setformValue({
            ...formValue,
            [name]: value
        })
    }
    // form submit
    const handleSubmit = e => {
        e.preventDefault()
        console.log(formValue)
        loginEmployer(formValue, backend)
            .then(res => {
                if (res.token) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: res.success,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(()=>{
                        localStorage.setItem("employer", res.token)
                        router.push('/employer-profile')
                    })
                } else if (res.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: res.error,

                    });
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/*<img*/}
                {/*    className="mx-auto h-10 w-auto"*/}
                {/*    src="/logo.jpg"*/}
                {/*    alt="Your Company"*/}
                {/*/>*/}
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Login to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="" onSubmit={handleSubmit} method="POST">
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
                                value={formValue.username}
                                onChange={handleChange}
                                autoComplete="username"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm pl-1"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <Link
                                    href="/user/forgot-password"
                                    className="font-semibold text-blue-600 hover:text-blue-500"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formValue.password}
                                onChange={handleChange}
                                autoComplete="current-password"
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
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-base text-gray-500 ">
                    <span>Not a member </span>
                    <Link
                        href="/register"
                        className="font-semibold text-blue-600 hover:text-blue-500 transition-all duration-500 ease-in-out transform hover:scale-110 hover:text-xl"
                    >
                        register now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Page;