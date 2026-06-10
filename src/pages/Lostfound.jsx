import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function LostFound() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const [lostFoundForm, setLostFoundForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    contactInfo: "",
    type: "lost",
  });

  const [itemImage, setItemImage] = useState(null);

  const handleCreateLostFound = async () => {
    try {
      const formData = new FormData();

      formData.append("title", lostFoundForm.title);
      formData.append("description", lostFoundForm.description);
      formData.append("location", lostFoundForm.location);
      formData.append("contactInfo", lostFoundForm.contactInfo);
      formData.append("type", lostFoundForm.type);

      if (itemImage) {
        formData.append("image", itemImage);
      }

      await api.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Item reported successfully");

      setShowCreateModal(false);

      setLostFoundForm({
        title: "",
        description: "",
        category: "",
        location: "",
        contactInfo: "",
        type: "lost",
      });

      setItemImage(null);

      fetchLostFoundItems();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to create report"
      );
    }
  };

  const fetchLostFoundItems = async () => {
    try {
      const { data } = await api.get("/api/posts");

      setItems(data.posts);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLostFoundItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" || item.type === filter;

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-violet-600">
          Loading Lost & Found...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}

      <section className="bg-linear-to-r from-violet-700 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold">Lost & Found</h1>

          <p className="mt-4 text-violet-100 text-lg">
            Find lost belongings or help others recover theirs.
          </p>
        </div>
      </section>

      {/* Search Section */}

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="all">All Items</option>

            <option value="lost">Lost</option>

            <option value="found">Found</option>
          </select>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-violet-600 text-white px-6 py-3 rounded-xl hover:bg-violet-700"
          >
            Report Item
          </button>
        </div>
      </section>
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
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Report Lost / Found Item</h2>

              <button
                onClick={() => setShowCreateModal(false)}
                className="text-3xl text-gray-400 hover:text-black"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Image */}

              <div>
                <label className="block font-medium mb-2">Item Image</label>

                <label
                  htmlFor="lostFoundImage"
                  className="border-2 border-dashed border-violet-300 rounded-2xl h-52 flex flex-col items-center justify-center cursor-pointer hover:bg-violet-50 overflow-hidden"
                >
                  {itemImage ? (
                    <img
                      src={URL.createObjectURL(itemImage)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <span className="text-5xl">📷</span>

                      <p className="mt-2 text-gray-600">
                        Click to upload image
                      </p>
                    </>
                  )}
                </label>

                <input
                  id="lostFoundImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setItemImage(e.target.files[0])}
                />
              </div>

              {/* Title */}

              <div>
                <label className="block font-medium mb-2">Title</label>

                <input
                  type="text"
                  value={lostFoundForm.title}
                  onChange={(e) =>
                    setLostFoundForm({
                      ...lostFoundForm,
                      title: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                  placeholder="Lost Wallet"
                />
              </div>

              {/* Description */}

              <div>
                <label className="block font-medium mb-2">Description</label>

                <textarea
                  rows="4"
                  value={lostFoundForm.description}
                  onChange={(e) =>
                    setLostFoundForm({
                      ...lostFoundForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                  placeholder="Describe the item..."
                />
              </div>

              {/* Location */}

              <div>
                <label className="block font-medium mb-2">Location</label>

                <input
                  type="text"
                  value={lostFoundForm.location}
                  onChange={(e) =>
                    setLostFoundForm({
                      ...lostFoundForm,
                      location: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                  placeholder="Library, DCSA Block..."
                />
              </div>

              {/* Contact */}

              <div>
                <label className="block font-medium mb-2">
                  Contact Information
                </label>

                <input
                  type="text"
                  value={lostFoundForm.contactInfo}
                  onChange={(e) =>
                    setLostFoundForm({
                      ...lostFoundForm,
                      contactInfo: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                  placeholder="Phone Number"
                />
              </div>

              {/* Type */}

              <div>
                <label className="block font-medium mb-2">Type</label>

                <select
                  value={lostFoundForm.type}
                  onChange={(e) =>
                    setLostFoundForm({
                      ...lostFoundForm,
                      type: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="lost">Lost Item</option>

                  <option value="found">Found Item</option>
                </select>
              </div>

              {/* Buttons */}

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border py-3 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCreateLostFound}
                  className="flex-1 bg-violet-600 text-white py-3 rounded-xl hover:bg-violet-700"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Items Grid */}

      <section className="max-w-7xl mx-auto px-6 pb-12">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-bold">No items found</h2>

            <p className="text-gray-500 mt-2">
              Try changing your search filters.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{item.title}</h3>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${item.type === "lost"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                        }`}
                    >
                      {item.type}
                    </span>
                  </div>

                  <p className="mt-2 text-gray-500">📍 {item.location}</p>

                  <p
                    className={`mt-2 text-sm font-semibold ${item.isResolved ? "text-green-600" : "text-orange-500"
                      }`}
                  >
                    {item.isResolved ? "Resolved" : "Active"}
                  </p>

                  <p className="text-sm text-gray-400 mt-3">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Details Modal */}

      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden max-h-[90vh] overflow-y-auto">
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="w-full h-80 object-cover"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedItem.image);
              }}
            />

            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold">{selectedItem.title}</h2>

                  <div className="flex gap-2 mt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${selectedItem.type === "lost"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                        }`}
                    >
                      {selectedItem.type}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${selectedItem.isResolved
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {selectedItem.isResolved ? "Resolved" : "Active"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-3xl text-gray-400 hover:text-black"
                >
                  ×
                </button>
              </div>

              <p className="mt-6 text-gray-700 leading-relaxed">
                {selectedItem.description}
              </p>

              <div className="mt-6 space-y-3">
                <p>
                  <strong>Location:</strong> {selectedItem.location}
                </p>

                <p>
                  <strong>Contact:</strong> {selectedItem.contactInfo}
                </p>

                <p>
                  <strong>Posted:</strong>{" "}
                  {new Date(selectedItem.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* <a
                href={`tel:${selectedItem.contactInfo}`}
                className="block w-full mt-6 bg-violet-600 text-white text-center py-3 rounded-xl hover:bg-violet-700"
              >
                Contact Owner
              </a> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
