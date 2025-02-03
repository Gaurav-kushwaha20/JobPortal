"use client"
import React, {useState} from "react";
import {login} from "../../api/UserAPI";
import {useRouter} from "next/navigation";
import Link from "next/link";

const Swal = require('sweetalert2')

// environment variable
const backend = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL

export default function SignIn() {
    const router = useRouter()
    const [formValue, setformValue] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [alert, setAlert] = useState(false)

    // handle change
    const handleChange = (e) => {
        const {name, value} = e.target
        setformValue({
            ...formValue,
            [name]: value
        })
    }
    // validate 
    const validate = () => {
        const newErrors = {email: "", password: ""};
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

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (true) {
            // send the information to the backend

            login(formValue, backend)
                .then(data => {
                    if (data?.error) {
                        // sweet alert if any error from the backend server
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: data.error,

                        });

                    } else if (data?.success) {
                        localStorage.setItem('c_user', data.token)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: data.success,
                            showConfirmButton: false,
                            timer: 1000,
                        }).then(() => {
                            console.log("redirecting to the profile page")
                            router.push('/profile');
                            console.log("redirected to the profile page")
                        });
                    } else {
                        // alert for something else error
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Some error occured, please try again later",

                        });
                    }
                })


            // 

            setAlert("Form submitted successfully!"); // Set alert message

            // Automatically clear alert after 3 seconds
            setTimeout(() => {
                setAlert("");
            }, 3000);
        }

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
                    Sign in to your account
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
                                <a
                                    href="/user/forgot-password"
                                    className="font-semibold text-blue-600 hover:text-blue-500"
                                >
                                    Forgot password?
                                </a>
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
}