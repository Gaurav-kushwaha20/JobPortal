// "use client"
import React from 'react';
import Link from "next/link";



const Navbar = ({ tabs = [{ tab: 'Home', link: '/home' }] }) => {


    return (
        <div className={'flex justify-between items-center px-10 h-20 bg-[#232525] text-white'}>
            {/*left side*/}
            <div className={'flex justify-center items-center gap-20 '}>
                <div>
                    <Link href={'/'}>
                        <img src="/logo-light.svg" alt="" />
                    </Link>
                </div>

                <div>
                    <ul className={'flex justify-between items-center gap-10 text-xl'}>
                        {

                            tabs?.map((tab, index) => (
                                <Link key={index} href={`${tab.link}`}> <li className='flex gap-2 items-center hover:scale-110 duration-500'><span>{tab.tab}</span> <span>{tab.icon}</span> </li> </Link>
                            ))
                        }


                    </ul>
                </div>

            </div>

            {/*right side*/}
            <div className={'flex items-center justify-center gap-10 text-xl'}>
                <Link href={'/login'}> <li className='flex gap-2 items-center hover:scale-110 duration-500'>Login</li></Link>
                <Link href={'/register'}> <li className='flex gap-2 items-center hover:scale-110 duration-500'>Sign Up</li></Link>
            </div>
        </div>
    );
};



export default Navbar;