import {useState} from "react";

export default function UserForm() {
    const [formValues, setFormValues] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        portfolio: "",
        email: "",
        hobbies: "",
    });

    const handleChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formValues);
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">User Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Full Name</label>
                        <div className={'flex gap-5'}>
                            <input
                                type="text"
                                name="first_name"
                                value={formValues.first_name}
                                onChange={handleChange}
                                className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your first name"
                                required
                            />
                            <input
                                type="text"
                                name="last_name"
                                value={formValues.last_name}
                                onChange={handleChange}
                                className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your last name"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formValues.phone}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Portfolio Website</label>
                        <input
                            type="url"
                            name="portfolio"
                            value={formValues.portfolio}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your portfolio URL"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Hobbies</label>
                        <textarea
                            name="hobbies"
                            value={formValues.hobbies}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your hobbies"
                        ></textarea>
                    </div>

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