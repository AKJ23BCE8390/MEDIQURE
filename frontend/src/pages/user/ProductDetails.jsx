import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State Management
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [ratingData,
    setRatingData] =
    useState({
        averageRating: 0,
        totalReviews: 0
    });

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    fetchRating();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.log("Error fetching product:", err);
      setError("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.log("Error fetching reviews:", err);
    }
  };

  const addToCart = async () => {
    try {
      setCartLoading(true);
      await api.post("/cart/add", {
        productId: product._id,
        quantity: 1,
      });
      alert("Added to cart successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setCartLoading(false);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setReviewLoading(true);
      await api.post("/reviews", {
        productId: id,
        rating: Number(rating),
        comment,
      });
      setComment("");
      setRating(5);
      fetchReviews(); // Refresh reviews list
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit review");
    } finally {
      setReviewLoading(false);
    }
  };
  const fetchRating =
    async () => {

        const res =
            await api.get(
                `/reviews/rating/${id}`
            );

        setRatingData(
            res.data
        );
    };

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  // 2. Error State
  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{error || "Product not found"}</h2>
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  // 3. Main UI
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-2 transition-colors"
        >
          <span>&larr;</span> Back
        </button>

        {/* --- PRODUCT OVERVIEW SECTION --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">
            
            {/* Left: Product Image */}
            <div className="flex justify-center items-center p-8 bg-white border border-slate-100 rounded-xl">
              {product.image ? (
                <img
                  src={`http://localhost:3000${product.image}`}
                  alt={product.name}
                  className="max-w-full h-auto object-contain max-h-80 drop-shadow-sm"
                />
              ) : (
                <div className="text-slate-400 flex flex-col items-center">
                  <span className="text-5xl mb-2">💊</span>
                  <p>No Image</p>
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col justify-center">
              {product.brand && (
                <p className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-1">
                  {product.brand}
                </p>
              )}
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mt-3">
    <span className="text-yellow-500 text-xl">
        ⭐
    </span>

    <span>
        {
            ratingData.averageRating
        }
    </span>

    <span className="text-slate-500">
        (
        {
            ratingData.totalReviews
        }
        reviews)
    </span>
</div>
              
              <div className="text-3xl font-bold text-slate-900 my-4">
                ₹{product.price}
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wider">About this item</h3>
                <p className="text-slate-600 leading-relaxed">
                  {product.description || "No description provided."}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100">
                <button
                  onClick={addToCart}
                  disabled={cartLoading}
                  className="w-full sm:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg shadow-md transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {cartLoading ? "Adding..." : "Add to Cart"}
                  {!cartLoading && <span>🛒</span>}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- REVIEW SYSTEM SECTION --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">
            Customer Reviews
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Write a Review Form */}
            <div className="lg:col-span-1">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 sticky top-24">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Write a Review</h3>
                
                <form onSubmit={submitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full rounded-lg border-slate-300 bg-white px-4 py-2 text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                      <option value="4">⭐⭐⭐⭐ (4/5)</option>
                      <option value="3">⭐⭐⭐ (3/5)</option>
                      <option value="2">⭐⭐ (2/5)</option>
                      <option value="1">⭐ (1/5)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Comment</label>
                    <textarea
                      required
                      rows="4"
                      placeholder="What did you like or dislike?"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full rounded-lg border-slate-300 bg-white px-4 py-3 text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none outline-none"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={reviewLoading || !comment.trim()}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    {reviewLoading ? "Posting..." : "Post Review"}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Display Reviews */}
            <div className="lg:col-span-2 space-y-4">
              {reviews.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <span className="text-4xl block mb-3">⭐</span>
                  <h3 className="text-lg font-medium text-slate-900">No reviews yet</h3>
                  <p className="text-slate-500">Be the first to share your thoughts!</p>
                </div>
              ) : (
                reviews.map((review, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      
                      {/* Star Display */}
                      <div className="text-yellow-400 text-lg tracking-widest flex items-center">
                        {"★".repeat(review.rating)}
                        <span className="text-slate-200">{"★".repeat(5 - review.rating)}</span>
                      </div>
                      
                      <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        Verified
                      </span>
                    </div>
                    
                    <p className="text-slate-700">
                      {review.comment}
                    </p>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}