import React, { useState } from "react";

function PrescriptionUpload() {
    const [file, setFile] = useState(null);

    function handleChange(e) {
        if (e.target.files && e.target.files[0]) {
            setFile(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
        <div className="max-w-sm mx-auto mt-8 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg text-center transition-colors">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Add Prescription
            </h2>
            
            <div className="mb-4">
                <input 
                    type="file" 
                    id="prescription-upload" 
                    className="hidden" 
                    onChange={handleChange} 
                    accept="image/*"
                />
                <label 
                    htmlFor="prescription-upload" 
                    className="cursor-pointer inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium rounded-lg transition-all duration-200 shadow-sm"
                >
                    {file ? "Change Image" : "Upload Image"}
                </label>
            </div>

            {file && (
                <div className="mt-6 p-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <img 
                        src={file} 
                        alt="uploaded preview" 
                        className="w-full max-h-64 object-contain rounded-md"
                    />
                </div>
            )}
        </div>
    );
}

export default PrescriptionUpload;