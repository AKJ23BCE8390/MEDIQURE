import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function AddProduct() {
  const navigate = useNavigate();

  // Integrated expiryDate into the main form state so it gets submitted
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    expiryDate: "", 
    prescriptionRequired: false,
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submit = async (e) => {

    e.preventDefault();

    try {

        setLoading(true);

        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("brand", form.brand);
        formData.append("category", form.category);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("stock", form.stock);
        formData.append("expiryDate", form.expiryDate);
        formData.append(
            "prescriptionRequired",
            form.prescriptionRequired
        );

        if (image) {

            formData.append(
                "image",
                image
            );

        }

        await api.post(

            "/products",

            formData,

            {

                headers: {

                    "Content-Type":
                        "multipart/form-data"

                }

            }

        );

        alert("Product added successfully");

        navigate("/chemist/products");

    }

    catch (error) {

        alert(

            error.response?.data?.message ||

            "Error adding product"

        );

    }

    finally {

        setLoading(false);

    }

};

  // Shared Tailwind class for inputs
  const inputStyles =
    "mt-1 block w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200";

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4">
          <h1 className="text-xl font-semibold text-white">Add New Product</h1>
          <p className="text-slate-400 text-sm mt-1">Enter medicine details into the inventory.</p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="p-6 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Width Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Medicine Name *</label>
              <input
                name="name"
                placeholder="e.g., Amoxicillin 500mg"
                onChange={handleChange}
                required
                className={inputStyles}
              />
            </div>

            {/* Half Width Fields */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Brand</label>
              <input
                name="brand"
                placeholder="e.g., Pfizer"
                onChange={handleChange}
                className={inputStyles}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Category</label>
              <input
                name="category"
                placeholder="e.g., Antibiotics"
                onChange={handleChange}
                className={inputStyles}
              />
            </div>

            {/* Full Width Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Description</label>
              <textarea
                name="description"
                placeholder="Brief description of the medication..."
                rows="3"
                onChange={handleChange}
                className={`${inputStyles} resize-none`}
              />
            </div>

            {/* Third Width Fields */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Price (₹) *</label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                min="0"
                onChange={handleChange}
                required
                className={inputStyles}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                placeholder="0"
                min="0"
                onChange={handleChange}
                required
                className={inputStyles}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Product Image</label>
              <div className="mt-1 flex items-center justify-center rounded-md border-2 border-dashed border-slate-300 px-6 pt-5 pb-6 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-slate-600 justify-center">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-transparent font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500">
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">
                    {image ? image.name : "PNG, JPG, GIF up to 5MB"}
                  </p>
                </div>
              </div>
            </div>

            {/* Prescription Checkbox */}
            <div className="md:col-span-2 flex items-center mt-2">
              <input
                id="prescriptionRequired"
                type="checkbox"
                name="prescriptionRequired"
                checked={form.prescriptionRequired}
                onChange={handleChange}
                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="prescriptionRequired" className="ml-3 block text-sm font-medium text-slate-700 cursor-pointer">
                Prescription Required for this medication
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving Product...
                </span>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}