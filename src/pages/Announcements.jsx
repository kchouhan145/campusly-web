import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { toast } from 'react-toastify';

// const announcementsData = [
//   {
//     id: 1,
//     title: "Mid Semester Examination Schedule Released",
//     department: "Academics",
//     priority: "High",
//     date: "2026-06-08",
//     pinned: true,
//     content:
//       "The mid semester examination schedule for all departments has been published. Students are advised to check their respective timetables.",
//   },
//   {
//     id: 2,
//     title: "Hackathon 2026 Registration Open",
//     department: "Events",
//     priority: "High",
//     date: "2026-06-06",
//     pinned: true,
//     content:
//       "Campus Hackathon 2026 registrations are now open. Last date to apply is 15 June.",
//   },
//   {
//     id: 3,
//     title: "Library Timing Updated",
//     department: "General",
//     priority: "Low",
//     date: "2026-06-04",
//     pinned: false,
//     content:
//       "Library will now remain open from 8 AM to 10 PM on weekdays.",
//   },
//   {
//     id: 4,
//     title: "Workshop on AI & ML",
//     department: "CSE",
//     priority: "Medium",
//     date: "2026-06-02",
//     pinned: false,
//     content:
//       "A 2-day workshop on AI & ML will be conducted next week in Seminar Hall 2.",
//   },
// ];

// const getPriorityColor = (priority) => {
//   switch (priority) {
//     case "High":
//       return "bg-red-100 text-red-600";
//     case "Medium":
//       return "bg-yellow-100 text-yellow-700";
//     case "Low":
//       return "bg-green-100 text-green-600";
//     default:
//       return "bg-gray-100 text-gray-600";
//   }
// };

const Announcements = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showFullImage, setShowFullImage] = useState(false);
  // const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = async () => {
    try {
      const { data } = await api.get("/api/announcements");
      setAnnouncements(data.announcements);
      // console.log(data.announcements[0]);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
    }

    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);
  const handleDeleteAnnouncement = async (announcementId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Announcement?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/api/announcements/${announcementId}`);
      // console.log(announcementId);

      toast.success("Announcement deleted successfully");

      fetchAnnouncements();
      setSelectedAnnouncement(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete announcements"
      );
    }
  };

  const filteredData = announcements.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || item.department === filter;

    return matchesSearch && matchesFilter;
  });
  const sortedData = [...filteredData].sort((a, b) => b.pinned - a.pinned);
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-violet-600">
          Loading Announcements...
        </h2>
      </div>
    );
  }
  return (

    <div className="min-h-screen bg-gray-50 p-6">

      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full p-6 relative">

            <button
              onClick={() => setSelectedAnnouncement(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
            >
              ×
            </button>

            <div className="mb-4">
              <span className="inline-block bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm">
                Announcement
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-3">
              {selectedAnnouncement.title}
            </h2>
            <p>
              {selectedAnnouncement.content}
            </p>
            <p className="font-bold">
              By {selectedAnnouncement.teacherName}
            </p>
            {selectedAnnouncement.image && (
              <img
                src={selectedAnnouncement.image}
                alt={selectedAnnouncement.title}
                onClick={() => setShowFullImage(true)}
                className="w-full h-64 object-cover rounded-2xl mb-4"
              />

            )}
            <p className="text-gray-600 mb-4">
              {selectedAnnouncement.createdAt &&
                new Date(
                  selectedAnnouncement.createdAt
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
            </p>

            {/* <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedAnnouncement.content}
              </div> */}
            {(
              String(user?._id || user?.id) ===
              String(selectedAnnouncement?.createdBy?._id) ||
              user?.role === "admin"
            ) && (
                <button
                  onClick={() => handleDeleteAnnouncement(selectedAnnouncement?._id)}
                  className="mt-3 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600"
                >
                  Delete Announcement
                </button>
              )}
          </div>
        </div>
      )}
      {showFullImage && (
        <div
          className="fixed inset-0 bg-black/90 z-9999 flex items-center justify-center p-4"
          onClick={() => setShowFullImage(false)}
        >
          <button
            className="absolute top-4 right-6 text-white text-4xl"
            onClick={() => setShowFullImage(false)}
          >
            ×
          </button>

          <img
            src={selectedAnnouncement.image}
            alt={selectedAnnouncement.title}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

        </div>
      )}
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Campus Announcements
        </h1>
        <p className="text-gray-500">
          Stay updated with latest notices and updates
        </p>
      </div>

      {/* Controls */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search announcements..."
          className="w-full md:w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* <select
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="Academics">Academics</option>
          <option value="Events">Events</option>
          <option value="CSE">CSE</option>
          <option value="General">General</option>
        </select> */}
      </div>

      {/* Announcements */}
      <div className="max-w-5xl mx-auto space-y-4">
        {sortedData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition"
            onClick={() => setSelectedAnnouncement(item)}
          >
            {/* Top Row */}
            <div className="flex justify-between items-start gap-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {item.department} • {item.date}
                </p>
              </div>

              {/* <div className="flex flex-col items-end gap-2">
                {item.pinned && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    Pinned
                  </span>
                )}
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                    item.priority
                  )}`}
                >
                  {item.priority}
                </span>
              </div> */}
            </div>

            {/* Content */}
            <p className="mt-3 text-gray-600 text-sm leading-relaxed">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;