"use client"
import React, { useEffect, useState, useRef } from 'react';
import { profileInfo } from "../../api/profileAPI";
import { getProfile, getUserRole } from "../../api/UserAPI";
import Overview from "./overview";
import Posts from "./posts";
import Setting from "./setting";
import Resume from "./resume";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MdAddAPhoto } from "react-icons/md";
import { UploadProfileForm } from './UploadProfile'

const imageUrl = "http://localhost:5000/";
const backend = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL


function Page(props) {
    const [username, setUsername] = useState('')
    const [userDetails, setUserDetails] = useState()
    const [role, setRole] = useState(0)
    const [profileClick, setProfileClick] = useState(false)
    const [uploadProfilePhoto, setUploadProfilePhoto] = useState(false)
    const uploadProfilePhotoRef = useRef(null)
    const changeYourProfileRef = useRef(null)
    const router = useRouter()

    // useState for overview, posts and setting tabs
    const [activeTab, setActiveTab] = useState('overview');
    console.log("welcome to profile page...")

    // this will extract the username from token from localstorage
    useEffect(() => {
        const token = localStorage.getItem("c_user")
        getProfile(token, backend)
            .then((res) => {
                if (res.error) {
                    localStorage.clear('c_user')
                    router.push('/login')
                }
                console.log(res.data._id)
                localStorage.setItem("sender", res.data._id)
                setRole(res.data.role)
                setUsername(res.data.username)
                setUserDetails(res.data)

            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    // disable the profile upload form when user click outside of the windows
    useEffect(() => {
        const handleClickOutsideForm = (event) => {
            if (uploadProfilePhotoRef.current && !uploadProfilePhotoRef.current.contains(event.target)) {
                setUploadProfilePhoto(false)
            }

            if (changeYourProfileRef.current && !changeYourProfileRef.current.contains(event.target)) {
                setProfileClick(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutsideForm)
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideForm)
        };
    }, [])

    // handle change profile click,
    const handleChangeProfileClick = () => {
        setUploadProfilePhoto(true);
        setProfileClick(false);

        
    }




    // whole page render only when details fetched
    if (userDetails) {
        // console.log(imageUrl.concat(userDetails.profile_picture))
        return (
            <div className=''>
                <div className={`min-h-screen bg-gray-100 py-8 ${uploadProfilePhoto ? 'blur-sm pointer-events-none' : ''} `}>
                    <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                        {/* Header Section */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                            <div className="flex items-center space-x-4 relative ">
                                <img
                                    onClick={() => { setProfileClick(prev => !prev) }}

                                    src={`${imageUrl.concat(userDetails.profile_picture)}`}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full border-4 border-white cursor-pointer object-cover object-center"
                                />
                                {/* profile change components */}
                                {profileClick &&
                                    <div ref={changeYourProfileRef} onClick={handleChangeProfileClick} id='change-profile-picture' className='absolute left-20 -bottom-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-900 hover:to-purple-800 px-6 py-3 rounded-lg'>
                                        <div className='flex gap-3 text-white cursor-pointer'> <span><MdAddAPhoto /></span> <span>Change your profile</span> </div>
                                    </div>}


                                <div className="text-white">
                                    <h1 className="text-2xl font-bold">
                                        <span>{userDetails.first_name.charAt(0).toUpperCase() + userDetails?.first_name.slice(1) + " "}</span>
                                        <span>{userDetails.last_name.charAt(0).toUpperCase() + userDetails?.last_name.slice(1)}</span>
                                    </h1>
                                    <p className="text-sm opacity-80">{userDetails.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex border-b border-gray-200">
                            {
                                //  for the employer
                                role == 1 && ['overview', 'posts', 'setting',].map(tab => {
                                    return (
                                        <button key={tab} onClick={() => {
                                            setActiveTab(tab)
                                        }}
                                            className={`flex-1 py-3 text-center font-medium text-gray-700 hover:bg-gray-300 hover:text-gray-700 ${activeTab === tab ? 'bg-gray-400 text-white' : ''}`}
                                        >
                                            {tab}
                                        </button>
                                    )
                                })
                            }

                            {
                                // only for the job seeker
                                role == 0 && ['overview', 'setting', 'resume'].map(tab => {
                                    return (
                                        <button key={tab} onClick={() => {
                                            setActiveTab(tab)
                                        }}
                                            className={`flex-1 py-3 text-center font-medium text-gray-700 hover:bg-gray-300 hover:text-gray-700 ${activeTab === tab ? 'bg-gray-400 text-white' : ''}`}
                                        >
                                            {tab}
                                        </button>
                                    )
                                })
                            }

                        </div>

                        {activeTab === 'overview' && <Overview username={username} />}
                        {activeTab === 'posts' && <Posts username={username} />}
                        {activeTab === 'setting' && <Setting username={username} />}
                        {activeTab === 'resume' && <Resume username={username} />}


                    </div>

                </div>

                {/* upload the profile video */}

                {uploadProfilePhoto && <div ref={uploadProfilePhotoRef} className='absolute top-[40%] left-[40%]'>
                    <UploadProfileForm />
                </div>}




            </div>
        )
    } else {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                    <span className="absolute inset-0 flex items-center justify-center font-semibold text-blue-500">
                        Loading...
                    </span>
                </div>
            </div>
        )
    }


}

export default Page;