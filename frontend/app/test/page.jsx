"use client"
import React, { useState } from "react";

const StepIndicator = ({ currentStep }) => {
    return (
        <div className="flex justify-center items-center mb-6">
            {["Step 1", "Step 2", "Step 3"].map((step, index) => (
                <div key={index} className="flex items-center">
                    <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold 
              ${index === currentStep ? "bg-blue-600" : "bg-gray-300"}`}
                    >
                        {index + 1}
                    </div>
                    {index < 2 && <div className="w-12 h-1 bg-gray-300 mx-2"></div>}
                </div>
            ))}
        </div>
    );
};

const FirstComponent = () => <div className="text-center text-xl">🏡 Welcome to Step 1</div>;
const SecondComponent = () => <div className="text-center text-xl">📄 This is Step 2</div>;
const ThirdComponent = () => <div className="text-center text-xl">✅ Step 3 Completed</div>;

const MultiStepForm = () => {
    const [step, setStep] = useState(0);
    const components = [<FirstComponent />, <SecondComponent />, <ThirdComponent />];

    return (
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg w-96 mx-auto mt-10">
            <StepIndicator currentStep={step} />
            <div className="mb-6">{components[step]}</div>

            <div className="flex justify-between w-full">
                <button
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg disabled:opacity-50"
                    onClick={() => setStep((prev) => prev - 1)}
                    disabled={step === 0}
                >
                    Previous
                </button>

                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                    onClick={() => setStep((prev) => prev + 1)}
                    disabled={step === components.length - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MultiStepForm;