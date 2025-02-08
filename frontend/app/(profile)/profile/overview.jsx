"use client";
import React, {useEffect, useState} from "react";
import BasicDetails from "./components/overview_1"
import EducationDetails from "./components/Education_Details"
import WorkExperienceDetails from "./components/WorkExperience"
import {getAppliedVacancies} from "../../api/VacencyAPI";

const backend = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL

function Overview() {
    const [index, setIndex] = React.useState(0);
    const components = [<BasicDetails/>, <EducationDetails/>, <WorkExperienceDetails/>];
    const [appliedVacancy, setAppliedVacancy] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("c_user")
        getAppliedVacancies(token, backend)
            .then(response => {
                if (response.success) {
                    console.log(response.data)
                    setAppliedVacancy(response.data)
                } else if (response.error) {
                    console.log("some error  occured")
                }
            })
            .catch(error => console.log(error))
    }, [])


    return (
        <div className="p-6">
            {/* Progress indicator */}
            <div className={"flex justify-center items-center mb-6"}>
                {components.map((component, i) => (

                    <div key={i} className="flex items-center">
                        <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${i === index ? "bg-blue-600" : "bg-gray-300"}`}>
                            {i + 1}
                        </div>

                        {i < (components.length - 1) && <div className="w-12 h-1 bg-gray-300 mx-2"></div>}
                        {i < (components.length - 1) && <div className="w-12 h-1 bg-gray-300 mx-2"></div>}

                    </div>
                ))}
            </div>

            {/* render different form  */}
            {
                ((index === 0 && <BasicDetails/>) || index === 1 && <EducationDetails/>) || (index === 2 &&
                    <WorkExperienceDetails/>)
            }

            <div className={'flex justify-between'}>
                <button
                    onClick={() => {
                        setIndex(prev => (prev === 0 ? components.length - 1 : prev - 1));
                    }}
                    className="bg-blue-500 text-white px-10 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
                    previous
                </button>

                <button
                    onClick={() => {
                        setIndex(prev => (prev === components.length - 1 ? 0 : prev + 1));
                    }}
                    className="bg-blue-500 text-white px-10 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
                    Next
                </button>
            </div>


            <div className={'mt-10'}>
                {appliedVacancy && appliedVacancy.length > 0 ?
                    appliedVacancy.map((vacancy, index) => (
                        <section key={index} className="text-gray-600 body-font">
                            <p className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 text-nowrap ">
                                {vacancy.vacancyId.company} <span>is looking for an employer.</span>
                            </p>
                            <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
                                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                                    <img className="object-cover object-center rounded" alt="hero"
                                         src={`${backend}/public/vacancy/${vacancy.vacancyId.photo}`}
                                    />
                                </div>
                                <div className=" pl-5 lg:pl-20 bg-red-200 flex flex-col items-start justify-start ">
                                    <p className={''}>
                                        {vacancy.vacancyId.title}
                                    </p>

                                    <p className="mb-8 leading-relaxed">{vacancy.vacancyId.description}</p>
                                    <div className="flex justify-center">
                                        <button
                                            className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button
                                        </button>
                                        <button
                                            className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))


                    :

                    <div>
                        No Any Applied vacancies
                    </div>


                }
            </div>
        </div>
    );
}

export default Overview;