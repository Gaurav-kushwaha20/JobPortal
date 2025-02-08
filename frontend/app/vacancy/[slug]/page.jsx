"use client"
import React, {useEffect, useState} from "react";
import {applyVacancy, getVacancyDetails} from '../../api/VacencyAPI';
import {useParams} from "next/navigation";
import Navbar from "../../Components/Navbar";
import Swal from "sweetalert2";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL


const VacancyDetailsPage = () => {
    const [isApplied, setIsApplied] = useState(false);
    const [vacancyDetails, setVacancyDetails] = useState()
    const [answer, setAnswer] = useState({
        question1: "",
        question2: "",
        cv: null
    })

    const {slug} = useParams();
    useEffect(() => {
        // get the vacancy details from the database
        const token = localStorage.getItem('c_user')
        getVacancyDetails(token, slug, backendUrl)
            .then(response => {
                setIsApplied(response.isApplied)
                setVacancyDetails(response.data)
            })
            .catch(error => console.log(error))
    }, [slug]);

    const handleChange = (e) => {
        const {name, value, type, files} = e.target;
        if (type === 'file') {
            setAnswer((prev) => (
                {
                    ...prev, [name]: files[0]
                }
            ))
        } else {
            setAnswer((prev) => (
                {...prev, [name]: value}
            ))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('c_user')
        const formData = new FormData();
        for (const key in answer) {
            if (key !== "cv" && answer[key]) {
                formData.append(key, answer[key]);
            }
        }
        if (answer.cv) {
            formData.append('cv', answer.cv);
        }

        applyVacancy(token, slug, formData, backendUrl)
            .then(response => {
                if(response.success){
                 Swal.fire("You successfully applied for the job vacancy!")   
                }else if(!response.success){
                    Swal.fire(`${response.error}`)
                }
            })
            .catch(error => console.log(error))


    }

    if (vacancyDetails) {
        return (
            <>
                <Navbar tabs={[{tab: 'Home', link: '/home'}, {tab: 'Message', link: '/message'}]}/>
                <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
                    {/* Banner Image */}
                    <div className="w-full max-w-6xl relative">
                        <img
                            src={`${backendUrl}/public/vacancy/${vacancyDetails.photo}`}
                            alt="Company Banner"
                            className="w-full h-96 object-contain object-center rounded-lg shadow-md"
                        />
                    </div>

                    {/* Job Details Container */}
                    <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 mt-6">
                        {/* Header Section */}
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                    {vacancyDetails.title}
                                </h1>
                                <div className="flex items-center space-x-4 text-lg text-gray-600">
                                    <span>{vacancyDetails.company}</span>
                                    <span className="text-gray-400">•</span>
                                    <span>{vacancyDetails.location}</span>
                                    <span
                                        className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">{vacancyDetails.type}
                                    </span>
                                </div>
                            </div>

                        </div>

                        {/* Job Description */}
                        <div className="grid lg:grid-cols-3 gap-8 mt-6">
                            {/* Left Column */}
                            <div className="lg:col-span-2">
                                <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
                                <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-8">
                                    {vacancyDetails.description}
                                </p>

                                <h3 className="text-2xl font-semibold mb-4">Skills Required</h3>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {vacancyDetails.skillsRequired.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
                                        >
                                            {skill}
                                         </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column - Job Details */}
                            <div className="lg:col-span-1">
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
                                    <h3 className="text-xl font-semibold mb-4">Job Details</h3>
                                    <div className="space-y-4 text-gray-700">
                                        <div>
                                            <p className="text-gray-600">Salary Range</p>
                                            <p className="font-medium">{vacancyDetails.salaryRange}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Location</p>
                                            <p className="font-medium">{vacancyDetails.location}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Job Type</p>
                                            <p className="font-medium">{vacancyDetails.type}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Company</p>
                                            <p className="font-medium">{vacancyDetails.company}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Posted</p>
                                            <p className="font-medium">
                                                {new Date(vacancyDetails.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/*  form to submit the resume  */}

                        <div className="w-full  bg-white rounded-lg shadow-lg p-6 mt-6">
                            {/*<h2 className="text-xl font-semibold text-gray-900 mb-4">Some questions for you</h2>*/}
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block text-gray-700 mb-2">How many of experience do you have in
                                        this particular field?</label>
                                    <input
                                        type="text"
                                        value={answer.question1}
                                        onChange={handleChange}
                                        name={'question1'}
                                        placeholder="Enter your experience in year"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">If you are hired, when do you join
                                        us?</label>
                                    <input
                                        type="text"
                                        name={'question2'}
                                        onChange={handleChange}
                                        value={answer.question2}
                                        placeholder=""
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2">Upload you CV .pdf only</label>
                                    <input
                                        onChange={handleChange}
                                        type="file"
                                        name="cv"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>

                                <button
                                    disabled={isApplied}
                                    type={'submit'}
                                    className={`${isApplied? 'pointer-events-none opacity-50': ''} w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all`}>
                                    {isApplied? 'Applied' : 'Apply now'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
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
};

export default VacancyDetailsPage;