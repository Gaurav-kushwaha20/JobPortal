"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { usePathname } from 'next/navigation';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }


    let path = usePathname()
    let showNavbar = (path.startsWith("/user")) ? false : true
    console.log(path)


    return (
        <>
            {showNavbar && <div className='backdrop-blur-sm sticky top-0 left-0 px-5'>
                <nav className='flex flex-col md:flex-row  justify-between items-center relative'>
                    <div className="left flex justify-between items-center w-full md:w-auto">
                        <div className="logo">
                            <Image src="/logo.png" width={50} height={10} alt='Logo' />
                        </div>

                        {/* Mobile Menu Button */}
                        <button onClick={toggleMenu} className="md:hidden">
                            {isOpen ? <AiOutlineClose size={24} /> : <GiHamburgerMenu size={24} />}
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="nav-items ml-0 md:ml-28 hidden md:block">
                        <ul className='flex flex-col md:flex-row justify-center items-center gap-8 text-lg'>
                            <Link href={'/'} className='py-4 hover:text-blue-700 rounded-full lg:text-lg md:text-xs  transition-all duration-500 ease-in-out transform hover:scale-110 hover:text-xl'><li>Home</li></Link>
                            <Link href={'/job-listing'} className='py-4 hover:text-blue-700 rounded-full lg:text-lg md:text-xs  transition-all duration-500 ease-in-out transform hover:scale-110 hover:text-xl'><li>Job Listing</li></Link>
                            <Link href={'/post-a-job'} className='py-4 hover:text-blue-700 rounded-full lg:text-lg md:text-xs  transition-all duration-500 ease-in-out transform hover:scale-110 hover:text-xl'><li>Post a Job</li></Link>
                            <Link href={'/services'} className='py-4 hover:text-blue-700 rounded-full lg:text-lg md:text-xs  transition-all duration-500 ease-in-out transform hover:scale-110 hover:text-xl'><li>Services</li></Link>
                            <Link href={'/about'} className='py-4 hover:text-blue-700 rounded-full lg:text-lg md:text-xs  transition-all duration-500 ease-in-out transform hover:scale-110 hover:text-xl'><li>About Us</li></Link>
                            <Link href={'/contact'} className='py-4 hover:text-blue-700 rounded-full lg:text-lg md:text-xs  transition-all duration-500 ease-in-out transform hover:scale-110 hover:text-xl'><li>Contact Us</li></Link>
                        </ul>
                    </div>

                    {/* Desktop Right Section */}
                    <div className="right hidden md:flex justify-center items-center gap-3">
                        <div className="profile">
                            <CgProfile size={40} />
                        </div>
                        <div className="user-login flex flex-col md:flex-row gap-6">
                            <Link href={'/user/login'}><button className='py-4 hover:text-blue-700 rounded-full text-lg md:text-xs lg:text-base transition-all duration-500 ease-in-out transform hover:scale-110 hover:text-xl'>Login</button></Link>
                            <Link href={'/user/register'}><button className='py-4 hover:text-blue-700 rounded-full text-lg md:text-xs lg:text-base transition-all duration-500 ease-in-out transform hover:scale-110 hover:text-xl'>Register</button></Link>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="absolute top-full left-0 right-0  shadow-lg md:hidden w-full">
                            <ul className='flex flex-col w-full'>
                                <Link href={'/'} className='py-4 hover:text-blue-700 px-4 hover:bg-gray-100 hover:font-semibold'><li>Home</li></Link>
                                <Link href={'/job-listing'} className='py-4 hover:text-blue-700 px-4 hover:bg-blue-100 hover:font-semibold'><li>Job Listing</li></Link>
                                <Link href={'/post-a-job'} className='py-4 hover:text-blue-700 px-4 hover:bg-blue-100 hover:font-semibold'><li>Post a Job</li></Link>
                                <Link href={'/services'} className='py-4 hover:text-blue-700 px-4 hover:bg-blue-100 hover:font-semibold'><li>Services</li></Link>
                                <Link href={'/about'} className='py-4 hover:text-blue-700 px-4 hover:bg-blue-100 hover:font-semibold'><li>About Us</li></Link>
                                <Link href={'/contact'} className='py-4 hover:text-blue-700 px-4 hover:bg-gray-100 hover:font-semibold'><li>Contact Us</li></Link>
                                <Link href={'/user/login'} className='py-4 hover:text-blue-700 px-4 hover:bg-blue-100 hover:font-semibold'><li>Login</li></Link>
                                <Link href={'/user/register'} className='py-4 hover:text-blue-700 px-4 hover:bg-blue-100 hover:font-semibold'><li>Register</li></Link>
                            </ul>
                        </div>
                    )}
                </nav>
            </div>}
        </>
    )
}

export default Navbar