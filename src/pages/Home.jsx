import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function Home() {
  const { user } = useAuth();

  const [announcements, setAnnouncements] = useState();
  const [upcomingEvents, setUpcomingEvents] = useState();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showFullImage, setShowFullImage] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventImage, setShowEventImage] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [image, setImage] = useState(null);

  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await api.get("/api/announcements");
        setAnnouncements(data.announcements);
        // console.log(data.announcements);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get("/api/events");
        setUpcomingEvents(data.events);
        // console.log(data.events);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };

    fetchEvents();
  }, []);
  const handleCreateAnnouncement = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", announcementForm.title);
      formData.append("content", announcementForm.content);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/announcements`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Announcement created");

        setShowAnnouncementModal(false);

        setAnnouncementForm({
          title: "",
          content: "",
        });

        setImage(null);

        fetchAnnouncements();
      } else {
        toast.error(data.message || "Failed to create announcement");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create announcement");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-violet-700 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Welcome back,
              <span className="block mt-2">
                {user?.name || "Student"} 👋
              </span>
            </h1>

            <p className="mt-4 text-violet-100 text-lg">
              Stay updated with campus announcements, events, and opportunities.
            </p>
          </div>

          {(user?.role === "teacher" || user?.role === "admin") && (
            <button
              onClick={() => setShowAnnouncementModal(true)}
              className="fixed bottom-6 right-6 bg-violet-600 text-white px-6 py-4 rounded-full shadow-xl hover:bg-violet-700 transition z-50"
            >
              📢 Create Announcement
            </button>
          )}

        </div>
      </section>
      {/* Announcements + Events */}
      <div className="grid lg:grid-cols-2 gap-8 m-10">
        {/* Announcements */}
        <div className="bg-white rounded-3xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Announcements
            </h2>

            <Link
              to="/announcements"
              className="text-violet-600 font-medium"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {!announcements || announcements.length === 0 ? (
              <div className="bg-white border rounded-2xl p-6 text-center">
                <h3 className="font-semibold text-lg">
                  📢 No Announcements Yet
                </h3>
                <p className="text-gray-500 mt-2">
                  Check back later for campus updates.
                </p>
              </div>
            ) : (
              announcements.map((item) => (
                <div
                  key={item._id || item.id}
                  className="border rounded-2xl p-4 hover:bg-slate-50"
                  onClick={() => setSelectedAnnouncement(item)}
                >
                  <h3 className="font-semibold">{item.title}</h3>
                  <div className="flex justify-between">
                    <p className="text-gray-600 text-sm mt-1 ">
                      {item.content}
                    </p>
                    <p className="font-bold">
                      By {item.teacherName}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
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

              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedAnnouncement.content}
              </div>
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

        {showAnnouncementModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl p-6 relative">

              <button
                onClick={() => setShowAnnouncementModal(false)}
                className="absolute top-4 right-5 text-2xl"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold mb-6">
                Create Announcement
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Announcement Title"
                  value={announcementForm.title}
                  onChange={(e) =>
                    setAnnouncementForm({
                      ...announcementForm,
                      title: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />

                <textarea
                  rows="5"
                  placeholder="Announcement Description"
                  value={announcementForm.content}
                  onChange={(e) =>
                    setAnnouncementForm({
                      ...announcementForm,
                      content: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />

                <div>
                  <label
                    htmlFor="announcementImage"
                    className="inline-flex items-center gap-2 px-4 py-3 bg-violet-600 text-white rounded-xl cursor-pointer hover:bg-violet-700 transition font-medium"
                  >
                    📷 Upload Image
                  </label>

                  <input
                    id="announcementImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="hidden"
                  />
                </div>

                <button
                  onClick={handleCreateAnnouncement}
                  className="w-full py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 cursor-pointer"
                >
                  Publish Announcement
                </button>

              </div>
            </div>
          </div>
        )}

        {/* Events */}
        <div className="bg-white rounded-3xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Upcoming Events
            </h2>

            <Link
              to="/events"
              className="text-violet-600 font-medium"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {!upcomingEvents || upcomingEvents.length === 0 ? (
              <div className="bg-white border rounded-2xl p-6 text-center">
                <h3 className="font-semibold text-lg">
                  🎉 No Upcoming Events
                </h3>
                <p className="text-gray-500 mt-2">
                  There are no scheduled events at the moment.
                </p>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div
                  key={event._id || event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="border rounded-2xl p-4 flex justify-between items-center hover:bg-slate-50"
                >
                  <div>
                    <h3 className="font-semibold">
                      {event.title}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      📍{event.location}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-violet-600">
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {selectedEvent && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-xl max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto">

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-0 right-1 text-3xl text-gray-500 hover:text-black"
                >
                  ×
                </button>

                {selectedEvent.image && (
                  <div className="relative">
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      onClick={() => setShowEventImage(true)}
                      className="w-full h-72 object-cover rounded-2xl cursor-zoom-in"
                    />

                    <span className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1 rounded-lg text-sm">
                      View Full Image
                    </span>
                  </div>
                )}

                <h2 className="text-3xl font-bold mt-5">
                  {selectedEvent.title}
                </h2>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="font-semibold">📅 Date</p>
                    <p>
                      {new Date(selectedEvent.date).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="font-semibold">📍 Venue</p>
                    <p>{selectedEvent.location}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold text-lg mb-2">
                    About Event
                  </h3>

                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* {selectedEvent.department && (
                  <div className="mt-6 border-t pt-4">
                    <p>
                      <strong>Organizer Department:</strong>{" "}
                      {selectedEvent.department}
                    </p>
                  </div>
                )} */}
              </div>
            </div>
          )}

          {showEventImage && selectedEvent?.image && (
            <div
              className="fixed inset-0 bg-black/95 z-9999 flex items-center justify-center p-4"
              onClick={() => setShowEventImage(false)}
            >
              <button
                className="absolute top-4 right-6 text-white text-4xl"
                onClick={() => setShowEventImage(false)}
              >
                ×
              </button>

              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Quick Actions */}
        {/* <div className="grid md:grid-cols-4 gap-6 mb-10">
          <Link
            to="/events"
            className="bg-white p-6 rounded-3xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl">🎉</div>
            <h3 className="font-bold text-lg mt-3">Events</h3>
            <p className="text-gray-500 text-sm">
              Explore upcoming campus events.
            </p>
          </Link>

          <Link
            to="/market"
            className="bg-white p-6 rounded-3xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl">🛒</div>
            <h3 className="font-bold text-lg mt-3">Marketplace</h3>
            <p className="text-gray-500 text-sm">
              Buy and sell items on campus.
            </p>
          </Link>

          <Link
            to="/lostfound"
            className="bg-white p-6 rounded-3xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl">🔍</div>
            <h3 className="font-bold text-lg mt-3">Lost & Found</h3>
            <p className="text-gray-500 text-sm">
              Report or recover lost items.
            </p>
          </Link>

          <Link
            to="/profile"
            className="bg-white p-6 rounded-3xl shadow hover:shadow-lg transition"
          >
            <div className="text-4xl">👤</div>
            <h3 className="font-bold text-lg mt-3">Profile</h3>
            <p className="text-gray-500 text-sm">
              Manage your account.
            </p>
          </Link>
        </div> */}

        {/* Stats */}
        {/* <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-3xl p-6 shadow">
            <h3 className="text-gray-500">Announcements</h3>
            <p className="text-3xl font-bold mt-2">12</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow">
            <h3 className="text-gray-500">Upcoming Events</h3>
            <p className="text-3xl font-bold mt-2">5</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow">
            <h3 className="text-gray-500">Marketplace Listings</h3>
            <p className="text-3xl font-bold mt-2">34</p>
          </div>
        </div> */}


      </div>
    </div>
  );
}