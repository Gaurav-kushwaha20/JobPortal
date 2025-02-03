'use client'
import React, {useEffect, useState} from "react";
import {getVacancy} from "../../api/VacencyAPI";
import InfiniteScroll from "react-infinite-scroll-component";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL


const page = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [hasMore, setHasMore] = useState(true);
    const [vacancies, setVacancies] = useState([]);


    // fetch the first initial 5 vacancy using useEffect
    useEffect(() => {
        const token = localStorage.getItem("c_user")
        getVacancy(token, backendUrl, page, limit)
            .then((response) => {
                console.log(response.data)
                setVacancies(response.data)
                setPage(prev => prev + 1)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])


    // request for the available vacancies from the database
    const fetchVacancies = async () => {
        try {
            const token = localStorage.getItem("c_user")
            getVacancy(token, backendUrl, page, limit)
                .then((response) => {
                    if (response.data.length === 0) {
                        setHasMore(false); // No more data to load
                        return;
                    }
                    setVacancies((prev) => [...prev, ...response.data]);
                    setPage((prev) => prev + 1); // Increment the page number for the next fetch

                })
                .catch((error) => {
                    console.error(error);
                });


        } catch (error) {
            console.error("Error fetching vacancies:", error);
        }
    };


    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        const formattedDate = date.toLocaleDateString('en-US', options);
        const formattedTime = date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
        return `${formattedDate} at ${formattedTime}`;
    };


    return (
        <div className="">
            {vacancies &&
                <InfiniteScroll
                    dataLength={vacancies.length} //This is important field to render the next data
                    next={fetchVacancies}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {vacancies.map((job, index) => (

                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
                        >
                            {/* Image Section */}
                            <div className="flex items-center gap-6">
                                <img
                                    src={`${backendUrl}/public/vacancy/job.jpeg`} // Replace this with the image URL from your job data
                                    alt={job.title}
                                    className="w-40 h-40 object-cover rounded-lg transform hover:rotate-3 hover:scale-105 transition-transform duration-300"
                                />
                                {/* Job Title and Type */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200">
                                            {job.title}
                                        </h2>
                                        <span
                                            className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                                            {job.type}
                                        </span>
                                    </div>
                                    {/* Company and Location */}
                                    <div className="mt-2 text-gray-600">
                                        <p className="font-medium text-lg">{job.company}</p>
                                        <p className="text-sm text-gray-500">{job.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Job Description */}
                            <p className="mt-4 text-gray-700 text-xl line-clamp-3">{job.description}</p>

                            {/* Skills Required */}
                            <div className="mt-4">
                                <h3 className="text-md font-medium text-gray-800">Skills Required:</h3>
                                <ul className="mt-2 flex flex-wrap gap-2">
                                    {job.skillsRequired.map((skill, idx) => (
                                        <li
                                            key={idx}
                                            className="px-6 py-2 bg-blue-50 text-blue-800 text-md font-medium rounded-full"
                                        >
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Posted By Section */}
                            <div className="mt-6 flex items-center gap-3">
                                <img
                                    src={`${backendUrl.concat('/').concat(job.employerId.profile_picture)}`} // Avatar of the user who posted the job
                                    alt={job.employerId.username}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="text-sm text-gray-800 font-medium">{job.employerId.username}</p>
                                    <p className="text-xs text-gray-500">Posted on {formatDate(job.createdAt)}</p>
                                </div>
                            </div>

                            {/* Footer with Salary and Apply Button */}
                            <div className="flex justify-between items-center mt-6">
                                <span
                                    className="text-lg font-semibold text-green-500 bg-green-100 px-3 py-1 rounded-lg">
                                    {job.salary}
                                </span>
                                <button
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg text-sm shadow-md hover:from-purple-500 hover:to-blue-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                                    onClick={() => alert(`Applying for ${job.title}`)}
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>

                    ))}
                </InfiniteScroll>}
        </div>
    )
}

export default page