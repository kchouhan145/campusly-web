import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Marketplace() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [category, setCategory] = useState("");
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [loading,setLoading] = useState(true);

  const [productForm, setProductForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    contactInfo: "",
  });

  const categories = [
    "Books",
    "Electronics",
    "Notes",
    "Furniture",
    "Sports",
    "Others",
  ];
  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/api/products/${productId}`);

      toast.success("Product deleted successfully");

      fetchProducts();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete product"
      );
    }
  };
  const handleCreateProduct = async () => {
    try {
      const formData = new FormData();

      formData.append("title", productForm.title);
      formData.append("description", productForm.description);
      formData.append("price", productForm.price);
      formData.append("category", productForm.category);
      formData.append("contactInfo", productForm.contactInfo);

      if (productImage) {
        formData.append("image", productImage);
      }
      // console.log(productImage);

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await api.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product listed successfully");

      setShowSellModal(false);

      setProductForm({
        title: "",
        description: "",
        category: "",
        price: "",
      });

      setProductImage(null);

      fetchProducts();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to create product"
      );
    }
  };

  const fetchProducts = async () => {
    try {
      const query = {};

      if (category) query.category = category;

      if (activeTab === "mine") {
        query.mine = true;
      }

      const { data } = await api.get("/api/products", {
        params: query,
      });

      setProducts(data.products || []);
      console.log(data.products);
    } catch (error) {
      console.log(error);
    }    
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, activeTab]);

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-violet-600">
          Loading MarketPlace...
        </h2>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}

      <section className="bg-linear-to-r from-violet-700 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold">
            Marketplace
          </h1>

          <p className="mt-4 text-violet-100 text-lg">
            Buy and sell books, notes, gadgets and more within
            your campus community.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              className="bg-white text-violet-700 px-6 py-3 rounded-xl font-semibold hover:bg-violet-50"
              onClick={() => setShowSellModal(true)}
            >
              + Sell Item
            </button>

            <button
              onClick={() => setActiveTab("mine")}
              className="border border-white px-6 py-3 rounded-xl"
            >
              My Listings
            </button>
          </div>
        </div>
      </section>
      {showSellModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">
                Sell Product
              </h2>

              <button
                onClick={() => setShowSellModal(false)}
                className="text-3xl text-gray-400 hover:text-black"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-5">

              {/* Product Image */}

              <div>
                <label className="block font-medium mb-2">
                  Product Image
                </label>

                <label
                  htmlFor="productImage"
                  className="border-2 border-dashed border-violet-300 rounded-2xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-violet-50 transition"
                >
                  {productImage ? (
                    <img
                      src={URL.createObjectURL(productImage)}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <>
                      <span className="text-5xl">📷</span>
                      <p className="mt-2 text-gray-600">
                        Click anywhere to upload image
                      </p>
                    </>
                  )}
                </label>

                <input
                  id="productImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
              </div>

              {productImage && (
                <img
                  src={URL.createObjectURL(productImage)}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-2xl"
                />
              )}

              {/* Title */}

              <input
                type="text"
                placeholder="Product Title"
                value={productForm.title}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    title: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
              />

              {/* Description */}

              <textarea
                rows="4"
                placeholder="Describe your product..."
                value={productForm.description}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
              />

              {/* Category */}

              <select
                value={productForm.category}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    category: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
              >
                <option value="">Select Category</option>
                <option value="Books">Books</option>
                <option value="Electronics">Electronics</option>
                <option value="Notes">Notes</option>
                <option value="Furniture">Furniture</option>
                <option value="Sports">Sports</option>
                <option value="Others">Others</option>
              </select>

              <input
                type="text"
                placeholder="Contact Information"
                value={productForm.contactInfo}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    contactInfo: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />
              {/* Price */}

              <input
                type="number"
                placeholder="Price (₹)"
                value={productForm.price}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    price: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none"
              />

              {/* Buttons */}

              <div className="flex gap-4">
                <button
                  onClick={() => setShowSellModal(false)}
                  className="flex-1 border border-gray-300 py-3 rounded-xl font-medium"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCreateProduct}
                  className="flex-1 bg-violet-600 text-white py-3 rounded-xl font-medium hover:bg-violet-700"
                >
                  Post Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Search */}

        <div className="bg-white p-5 rounded-3xl shadow-sm mb-8">
          <input
            type="text"
            placeholder="Search books, electronics, notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Tabs */}

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-2 rounded-xl ${activeTab === "all"
              ? "bg-violet-600 text-white"
              : "bg-white border"
              }`}
          >
            All Listings
          </button>

          <button
            onClick={() => setActiveTab("mine")}
            className={`px-5 py-2 rounded-xl ${activeTab === "mine"
              ? "bg-violet-600 text-white"
              : "bg-white border"
              }`}
          >
            My Listings
          </button>
        </div>

        {/* Categories */}

        {/* <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setCategory("")}
            className={`px-4 py-2 rounded-full ${
              category === ""
                ? "bg-violet-600 text-white"
                : "bg-white border"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full ${
                category === cat
                  ? "bg-violet-600 text-white"
                  : "bg-white border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div> */}

        {/* Product Grid */}

        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <div
                key={item._id}
                onClick={() => setSelectedProduct(item)}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-52 w-full object-cover"
                  />

                  {item.status === "sold" && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                      SOLD
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg truncate">
                    {item.title}
                  </h3>

                  <p className="text-violet-600 font-bold text-xl mt-2">
                    ₹{item.price}
                  </p>

                  <p className="text-gray-500">
                    {item.category}
                  </p>

                  <p className="font-semibold text-sm mt-2">
                    Posted By:{item.sellerId?.name}
                  </p>

                  <button className="mt-4 w-full bg-violet-600 text-white py-2 rounded-xl">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center">
            <h2 className="text-2xl font-semibold">
              No Listings Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing category or search term.
            </p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-9999 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-5xl"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Full View"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden">

            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-full h-80 object-cover"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedProduct.image);
              }}
            />

            <div className="p-6">

              <div className="flex justify-between">
                <h2 className="text-3xl font-bold">
                  {selectedProduct.title}
                </h2>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-3xl"
                >
                  ×
                </button>
              </div>

              <p className="text-violet-600 text-2xl font-bold mt-3">
                ₹{selectedProduct.price}
              </p>

              <p className="mt-4 text-gray-600">
                {selectedProduct.description}
              </p>

              <div className="mt-6 border-t pt-4">
                <p>
                  <strong>Seller:</strong>{" "}
                  {selectedProduct.sellerId?.name}
                </p>

                <p>
                  <strong>Contact:</strong>{" "}
                  {selectedProduct.contactInfo}
                </p>

                <p>
                  <strong>Department:</strong>{" "}
                  {selectedProduct.sellerId?.department}
                </p>
              </div>
              {/* <p>User ID: {user?._id || user?.id}</p>
              <p>Seller ID: {selectedProduct?.sellerId?._id}</p> */}

              {String(user?._id || user?.id) ===
                String(selectedProduct?.sellerId?._id) && (
                  <button
                    onClick={() => handleDeleteProduct(selectedProduct._id)}
                    className="mt-3 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600"
                  >
                    Delete Product
                  </button>
                )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}