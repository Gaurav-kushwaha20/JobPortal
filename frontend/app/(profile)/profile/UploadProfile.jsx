import { useState } from "react";
import { uploadProfile } from "../../api/UserAPI";
const backend = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL


export const UploadProfileForm = () => {
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null)

    // handle change the upload photo
    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
        if (e.target.files[0]) {
            setPreview(URL.createObjectURL(e.target.files[0]))   
        }
    };

    // handle submit the upload the photo
    const handleSubmit = (e) => {
        const token = localStorage.getItem('c_user')
        e.preventDefault();
        // Handle form submission (e.g., upload to server)
        const formdata = new FormData()
        formdata.append("file",photo)

        uploadProfile(token,formdata,backend)
        .then(response=>{
            if(response.success){
                window.location.href = window.location.href
            }
        })
        .catch(error=>{
            console.log(error)
        })

    };


    return (
        <div className=" bg-gray-400 flex justify-center items-center rounded-lg">
            <div className="bg-gray-200 p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Upload Your Media
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Photo Upload Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Upload Photo
                        </label>
                        {preview && <img className="mx-auto" src={preview} alt="Preview" style={{ width: '300px' }} />}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
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


                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


