
import { useState } from "react";

export default function EducationForm() {
    const [education, setEducation] = useState([
        {
            institution: "",
            startDate: "",
            endDate: "",
            description: "",
        },
    ]);

    const handleChange = (index, e) => {
        const newEducation = [...education];
        console.log(newEducation);
        newEducation[index][e.target.name] = e.target.value;
        setEducation(newEducation);
    };

    const addEducation = () => {
        setEducation([
            ...education,
            { institution: "", startDate: "", endDate: "", description: "" },
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Education Details:", education);
    };

    return (
        <div className="bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Education Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {education.map((edu, index) => (
                        <div key={index} className="border p-4 rounded-lg bg-gray-50">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Institution Name</label>
                                <input
                                    type="text"
                                    name="institution"
                                    value={edu.institution}
                                    onChange={(e) => handleChange(index, e)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter institution name"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={edu.startDate}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600">End Date</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={edu.endDate}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-3">
                                <label className="block text-sm font-medium text-gray-600">Description</label>
                                <textarea
                                    name="description"
                                    value={edu.description}
                                    onChange={(e) => handleChange(index, e)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Describe your major subjects and learnings"
                                ></textarea>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addEducation}
                        className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        + Add More Education
                    </button>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}