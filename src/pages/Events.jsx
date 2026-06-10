import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Events() {
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading,setLoading] = useState(true);

  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
  });

  const [eventImage, setEventImage] = useState(null);

  const handleCreateEvent = async () => {
    try {
      const formData = new FormData();

      formData.append("title", eventForm.title);
      formData.append("description", eventForm.description);
      formData.append("date", eventForm.date);
      formData.append("time", eventForm.time);
      formData.append("location", eventForm.location);
      formData.append("category", eventForm.category);

      if (eventImage) {
        formData.append("image", eventImage);
      }

      await api.post("/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Event created successfully");

      setShowCreateModal(false);

      setEventForm({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "",
      });

      setEventImage(null);

      fetchEvents();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to create event"
      );
    }
  };

  const fetchEvents = async () => {
    try {
      const { data } = await api.get("/api/events");
      setEvents(data.events || data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch events");
    }    
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const query = search.toLowerCase();

      return (
        event.title?.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query)
      );
    });
  }, [events, search]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-violet-600">
          Loading Events...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-violet-700 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-bold">
            🎉 Campus Events
          </h1>

          <p className="mt-4 text-violet-100 text-lg max-w-2xl">
            Explore workshops, hackathons, seminars, cultural programs,
            competitions and more happening around your campus.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Search + Button */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 px-4 py-3 bg-white border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
          />

          {(user?.role === "teacher" || user?.role === "admin") && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700"
            >
              ➕ Create Event
            </button>
          )}
        </div>
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Create Event
                </h2>

                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-3xl text-gray-500 hover:text-black"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">

                <input
                  type="text"
                  placeholder="Event Title"
                  value={eventForm.title}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      title: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />

                <textarea
                  rows="4"
                  placeholder="Event Description"
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        date: e.target.value,
                      })
                    }
                    className="border rounded-xl px-4 py-3"
                  />

                  <input
                    type="time"
                    value={eventForm.time}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        time: e.target.value,
                      })
                    }
                    className="border rounded-xl px-4 py-3"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Location / Venue"
                  value={eventForm.location}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      location: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />

                <select
                  value={eventForm.category}
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      category: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl px-4 py-3"
                >
                  <option value="">Select Category</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Competition">Competition</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                </select>

                {/* Image Upload */}

                <div>
                  <label
                    htmlFor="eventImage"
                    className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-violet-300 rounded-2xl cursor-pointer hover:bg-violet-50"
                  >
                    <span className="text-4xl">📷</span>
                    <p className="mt-2 font-medium">
                      Click to upload event poster
                    </p>
                  </label>

                  <input
                    id="eventImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEventImage(e.target.files[0])}
                    className="hidden"
                  />
                </div>

                {eventImage && (
                  <img
                    src={URL.createObjectURL(eventImage)}
                    alt="Preview"
                    className="w-full h-56 object-cover rounded-xl"
                  />
                )}

                <button
                  onClick={handleCreateEvent}
                  className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700"
                >
                  Create Event
                </button>

              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        {/* <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow">
            <p className="text-gray-500">Total Events</p>
            <h3 className="text-3xl font-bold mt-2">
              {events.length}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <p className="text-gray-500">Upcoming</p>
            <h3 className="text-3xl font-bold mt-2">
              {events.length}
            </h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <p className="text-gray-500">Campus Activities</p>
            <h3 className="text-3xl font-bold mt-2">
              Active
            </h3>
          </div>
        </div> */}

        {/* Empty State */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 shadow text-center">
            <div className="text-6xl mb-4">🎉</div>

            <h2 className="text-2xl font-bold">
              No Events Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try another search or check back later.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                onClick={() => setSelectedEvent(event)}
                className="bg-white rounded-3xl shadow hover:shadow-xl transition overflow-hidden cursor-pointer"
              >
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-52 object-cover"
                  />
                )}

                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <span className="bg-violet-100 text-violet-700 text-sm px-3 py-1 rounded-full">
                      Event
                    </span>

                    <span className="font-semibold text-violet-600">
                      {event.date
                        ? new Date(event.date).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                          }
                        )
                        : ""}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mt-4">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="mt-4 text-gray-500">
                    📍 {event.location || "Campus"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {selectedEvent.image && (
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-80 object-cover"
              />
            )}

            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-3xl font-bold">
                  {selectedEvent.title}
                </h2>

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-3xl text-gray-500 hover:text-black"
                >
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-semibold">📅 Date</h4>
                  <p>
                    {selectedEvent.date
                      ? new Date(
                        selectedEvent.date
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                      : "Not specified"}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-semibold">📍 Location</h4>
                  <p>
                    {selectedEvent.location ||
                      "Campus Venue"}
                  </p>
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

              {/* {selectedEvent.organizer && (
                <div className="mt-6 border-t pt-4">
                  <p>
                    <strong>Organizer:</strong>{" "}
                    {selectedEvent.organizer}
                  </p>
                </div>
              )} */}

              {/* {selectedEvent.registrationLink && (
                <a
                  href={selectedEvent.registrationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-6 px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700"
                >
                  Register Now
                </a>
              )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}