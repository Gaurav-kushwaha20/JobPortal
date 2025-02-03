"use client";
import React from "react";
import BasicDetails from "./components/overview_1"
import EducationDetails from "./components/Education_Details"
import WorkExperienceDetails from "./components/WorkExperience"


function Overview() {
    const [index, setIndex] = React.useState(0);
    const components = [<BasicDetails/>, <EducationDetails/>, <WorkExperienceDetails/>];

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
        </div>
    );
}

export default Overview;