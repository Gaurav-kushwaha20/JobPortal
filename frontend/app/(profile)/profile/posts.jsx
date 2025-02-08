"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {deleteVacancy, getUserVacancies, postVacancy} from "../../api/VacencyAPI";
import InfiniteScroll from 'react-infinite-scroll-component'
import Swal from "sweetalert2";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;

const ManageJobPosts = ({username}) => {
    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        skillsRequired: "",
        salaryRange: "",
        location: "",
        type: "",
        company: "",
        photo: null
    })

    //  handle change of the form value
    const handleChangeFormValues = e => {
        const {name, value, files, type} = e.target;
        
        if (name === "photo") {
            setPreview(URL.createObjectURL(files[0]));
        }

        setFormValues((previousValues) => (
            {...previousValues, [name]: type === "file" ? files[0] : value}


        ))
    };


    // state variable to implement the pagination previous and next state
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(2)
    const [hasMore, setHasMore] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [vacancies, setVacancies] = useState([]);
    const [message, setMessage] = useState("");
    const [preview, setPreview] = useState(null)
    const router = useRouter();

    // initial fetch of the vacancies
    useEffect(() => {
        getUserVacancies(username, backendUrl, page, limit)
            .then((response) => {
                if (response.data.length < 1) {
                    setHasMore(false);
                }

                setVacancies(response.data);
                // console.log(response.data);
                setPage((prev) => prev + 1); // Increment the page number for the next fetch
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])


    // Function to fetch vacancies
    const fetchVacancies = async () => {
        console.log(page)
        try {
            getUserVacancies(username, backendUrl, page, limit)
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("c_user");
        const formData = new FormData();
         for(const key in formValues){
             if(key !== "photo" && formValues[key]){
                 formData.append(key, formValues[key]);
             }
         }
        if (formValues.photo) {
            formData.append("photo", formValues.photo)
        }
        

        postVacancy(formData, token, backendUrl)
            .then((res) => {
                if (res?.success) {
                    setMessage(`🎉 ${res.success}`);
                    setShowForm(false);
                   

                    // Fetch updated vacancies
                    getUserVacancies(username, backendUrl)
                        .then((response) => {
                            setVacancies(response.data);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                } else if (res?.error) {
                    setMessage(res.error);
                }
            })
            .catch((err) => {
                setMessage("⚠️ Failed to post the job vacancy.");
            });
    };

    // delete the vacancy 
    const handleDelete = (id) => {
        const token = localStorage.getItem("c_user");
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteVacancy(token, id, backendUrl)
                    .then((res) => {
                        console.log(res.success);
                        if (res.success) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your vacancy is deleted.",
                                icon: "success"
                            });
                            window.location.reload();
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            }
        });
    }

    // handle change the upload photo
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {year: "numeric", month: "long", day: "numeric"};
        const formattedDate = date.toLocaleDateString("en-US", options);
        const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${formattedDate} at ${formattedTime}`;
    };

    return (
        vacancies &&
        <div className="p-6 mx-auto">
            {/* Create Post Button */}
            <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
            >
                {showForm ? "Cancel" : "Create Post"}
            </button>

            {/* Success/Error Message */}
            {message && (
                <p
                    className={`mt-4 p-3 rounded-lg text-center ${message.startsWith("🎉")
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                    {message}
                </p>
            )}

            {/* Create Post Form */}
            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="mt-6 bg-white shadow-md rounded-lg p-6"
                >
                    <h2 className="text-xl font-bold text-gray-700 mb-4">
                        Create a Job Vacancy
                    </h2>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Job Title:
                        </label>
                        <input
                            type="text"
                            name={"title"}
                            value={formValues.title}
                            onChange={(e) => handleChangeFormValues(e)}

                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter job title"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Job Description:
                        </label>
                        <textarea
                            name={"description"}
                            value={formValues.description}
                            onChange={(e) => handleChangeFormValues(e)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter job description"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Job Type:
                        </label>
                        <select
                            name={'type'}
                            value={formValues.type}
                            onChange={(e) => handleChangeFormValues(e)}

                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select job type</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Full-Time">Full-Time</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Skills Required (comma-separated):
                        </label>
                        <input
                            name={"skillsRequired"}
                            type="text"
                            value={formValues.skillsRequired}
                            onChange={(e) => handleChangeFormValues(e)}

                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., React.js, Node.js, MongoDB"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Salary Range:
                        </label>
                        <input
                            type="text"
                            name={"salaryRange"}
                            value={formValues.salaryRange}
                            onChange={(e) => handleChangeFormValues(e)}

                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 50,000-70,000"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Location:
                        </label>
                        <input
                            type="text"
                            name={"location"}
                            value={formValues.location}
                            onChange={(e) => handleChangeFormValues(e)}

                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Kathmandu, Nepal"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Company Name:
                        </label>
                        <input
                            type="text"
                            name={"company"}
                            value={formValues.company}
                            onChange={(e) => handleChangeFormValues(e)}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter company name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Upload Photo
                        </label>
                        {preview && <img className="mx-auto" src={preview} alt="Preview" style={{width: '300px'}}/>}
                        <input
                            name={"photo"}
                            type="file"
                            accept="image/*"            // only image will apear inside the folder containing image, picture or video 
                            onChange={(e) => handleChangeFormValues(e)}

                            className="hidden"
                            id="fileInput"
                        />

                        <label
                            htmlFor="fileInput"
                            className="flex items-center justify-center py-4  text-white rounded-full cursor-pointer "
                        >
                            <p className="text-2xl  p-4 w-16 text-center rounded-full bg-blue-500 hover:bg-blue-600 transition duration-300">+</p>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg shadow-md hover:bg-green-700 transition-all duration-200"
                    >
                        Post Job Vacancy
                    </button>
                </form>
            )}
            {/* Display Vacancies */}


            {/* infinite scrollz */}
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
                        className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-2xl">
                        {/* Image Section */}
                        <div className="flex items-center gap-6">
                            <img
                                src={`${backendUrl.concat("/public/vacancy/",job.photo)}`} // Replace this with the image URL from your job data
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
                                src={`${backendUrl}`} // Avatar of the user who posted the job
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
                            <span className="text-lg font-semibold text-green-500 bg-green-100 px-3 py-1 rounded-lg">
                                {job.salaryRange}
                            </span>

                            <div className={'flex gap-5'}>
                                <button
                                    className={'px-4 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-purple-700 hover:animate-pulse'}>
                                    Edit
                                </button>


                                <button
                                    className="px-4 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:animate-pulse"
                                    onClick={() => {
                                        handleDelete(job._id)
                                    }}>
                                    Delete
                                </button>

                            </div>
                        </div>
                    </div>

                ))}
            </InfiniteScroll>
        </div>
    );
};

export default ManageJobPosts;