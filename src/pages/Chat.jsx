import React from "react";
import { Link } from "react-router-dom";

export default function Chat() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-linear-to-r from-violet-700 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                Exclusive Mobile Feature
              </span>

              <h1 className="text-5xl md:text-6xl font-bold mt-6 leading-tight">
                Campus Chat
                <span className="block text-violet-200">
                  Built for Students
                </span>
              </h1>

              <p className="mt-6 text-xl text-violet-100 leading-relaxed">
                Stay connected with classmates, faculty members, and your
                department. Campusly Chat is available exclusively through the
                Campusly mobile application.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/download">
                  <button className="px-8 py-4 bg-white text-violet-700 font-semibold rounded-2xl hover:scale-105 transition cursor-pointer">
                    Download App
                  </button>
                </Link>

                <button className="px-8 py-4 border border-white rounded-2xl hover:bg-white/10 cursor-pointer">
                  Learn More
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src="/screenshots/chatHome.jpg"
                alt="Campusly Chat"
                className="w-72 md:w-96 rounded-[40px] shadow-2xl"
              />
            </div>

          </div>

        </div>
      </section>

      {/* Features */}

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              Everything You Need To Connect
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              Communicate smarter with the Campusly community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl">💬</div>

              <h3 className="text-xl font-bold mt-5">
                Personal Chats
              </h3>

              <p className="text-gray-500 mt-3">
                Connect instantly with classmates, seniors, and friends.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl">🏫</div>

              <h3 className="text-xl font-bold mt-5">
                Department Chats
              </h3>

              <p className="text-gray-500 mt-3">
                Join conversations specific to your department.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl">👨‍🏫</div>

              <h3 className="text-xl font-bold mt-5">
                Faculty Interaction
              </h3>

              <p className="text-gray-500 mt-3">
                Easily communicate with teachers and mentors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition">
              <div className="text-5xl">🔔</div>

              <h3 className="text-xl font-bold mt-5">
                Instant Updates
              </h3>

              <p className="text-gray-500 mt-3">
                Never miss important campus information again.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Screenshots */}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              Beautiful Mobile Experience
            </h2>

            <p className="text-gray-500 mt-4">
              Designed specifically for students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-3xl shadow-xl p-4">
              <img
                src="/screenshots/PersonalChat.jpg"
                alt="Personal Chat"
                className="rounded-2xl w-full"
              />

              <h3 className="font-bold text-xl mt-5">
                Personal Messaging
              </h3>

              <p className="text-gray-500 mt-2">
                One-to-one conversations with campus members.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-4">
              <img
                src="/screenshots/DeptChat.jpg"
                alt="Department Chat"
                className="rounded-2xl w-full"
              />

              <h3 className="font-bold text-xl mt-5">
                Department Groups
              </h3>

              <p className="text-gray-500 mt-2">
                Collaborate and discuss academic topics.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-4">
              <img
                src="/screenshots/home.jpg"
                alt="Announcements"
                className="rounded-2xl w-full"
              />

              <h3 className="font-bold text-xl mt-5">
                Campus Community
              </h3>

              <p className="text-gray-500 mt-2">
                Stay connected with everything happening around you.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Why Campusly */}

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-16 items-center">

            <div>
              <h2 className="text-4xl font-bold">
                Why Use Campusly Chat?
              </h2>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Campusly is built specifically for educational institutions.
                Every user is verified, ensuring secure and meaningful
                communication within your campus community.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <p>Verified student accounts</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <p>Department-specific discussions</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <p>Faculty communication channels</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <p>Real-time messaging</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-green-600 text-xl">✓</span>
                  <p>Safe and secure campus network</p>
                </div>

              </div>
            </div>

            <div>
              <img
                src="/screenshots/loadingS.jpg"
                alt="Campusly Preview"
                className="rounded-3xl shadow-2xl"
              />
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}

      <section className="bg-linear-to-r from-violet-700 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">

          <h2 className="text-5xl font-bold">
            Ready To Start Chatting?
          </h2>

          <p className="text-xl text-violet-100 mt-6">
            Download the Campusly mobile app and become part of your campus
            community.
          </p>

          <Link to="/download">
            <button className="mt-10 px-10 py-4 bg-white text-violet-700 rounded-2xl font-semibold text-lg hover:scale-105 transition cursor-pointer">
              Download Campusly
            </button>
          </Link>

        </div>
      </section>

    </div>
  );
}