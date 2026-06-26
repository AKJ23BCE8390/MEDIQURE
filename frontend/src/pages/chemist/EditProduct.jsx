import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    prescriptionRequired: false,
    image: "",
  });

  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setForm(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load product details.");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let imageUrl = form.image;

      if (newImage) {
        const imageData = new FormData();
        imageData.append("image", newImage);

        const uploadRes = await api.post("/products/upload-image", imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        imageUrl = uploadRes.data.imageUrl;
      }

      await api.put(`/products/${id}`, {
        ...form,
        image: imageUrl,
      });

      alert("Product Updated Successfully");
      navigate("/chemist/products");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles =
    "mt-1 block w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200";

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Loading product details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-white">Edit Product</h1>
            <p className="text-slate-400 text-sm mt-1">Update inventory details.</p>
          </div>
          <button 
            onClick={() => navigate('/chemist/products')}
            className="text-slate-300 hover:text-white text-sm font-medium"
          >
            Cancel
          </button>
        </div>

        {/* Form */}
        <form onSubmit={updateProduct} className="p-6 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Medicine Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputStyles}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Brand</label>
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputStyles}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700">Description</label>
              <textarea
                name="description"
                value={form.description}
                rows="3"
                onChange={handleChange}
                className={`${inputStyles} resize-none`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={form.price}
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
                value={form.stock}
                min="0"
                onChange={handleChange}
                required
                className={inputStyles}
              />
            </div>

            {/* Image Upload & Preview */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Product Image</label>
              
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Current Image Preview */}
                {form.image && !newImage && (
                  <div className="flex-shrink-0">
                    <p className="text-xs text-slate-500 mb-1">Current Image:</p>
                    <img
                      src={`http://localhost:3000${form.image}`}
                      alt="Current Product"
                      className="h-32 w-32 object-cover rounded-lg border border-slate-200 shadow-sm"
                    />
                  </div>
                )}

                {/* Upload New */}
                <div className="flex-grow w-full">
                  <div className="flex justify-center rounded-md border-2 border-dashed border-slate-300 px-6 pt-5 pb-6 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-10 w-10 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-slate-600 justify-center">
                        <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                          <span>Upload new image</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => setNewImage(e.target.files[0])}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-slate-500">
                        {newImage ? newImage.name : "Select to replace current image"}
                      </p>
                    </div>
                  </div>
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
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 transition-colors duration-200"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}