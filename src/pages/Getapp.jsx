import { Download, Smartphone, Bell, ShoppingBag, Calendar, MessageCircle } from "lucide-react";

export default function Getapp() {
  return (
    <div className="min-h-screen bg-linear-to-b from-violet-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold">
              🚀 Latest Release Available
            </span>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mt-6 leading-tight">
              Campus Life,
              <span className="text-violet-600"> Simplified.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Stay connected with your campus community. Get event updates,
              announcements, marketplace listings, lost & found alerts, and
              real-time communication—all in one app.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="/Campusly.apk"
                download
                className="px-8 py-4 bg-violet-600 text-white rounded-2xl font-semibold hover:bg-violet-700 transition flex items-center gap-2"
              >
                <Download size={20} />
                Download APK
              </a>

              <div className="px-8 py-4 border border-gray-300 rounded-2xl">
                <span className="font-medium">Version 2.1</span>
              </div>
            </div>

            <div className="flex gap-8 mt-8 text-sm text-gray-500">
              <div>✓ Free</div>
              <div>✓ Secure Login</div>
              <div>✓ Student Verified</div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center">
            <div className="w-72 h-140 bg-gray-900 rounded-[40px] p-3 shadow-2xl">
              <div className="w-full h-full bg-white rounded-4xl overflow-hidden">
                <img
                  src="/screenshots/loadingS.jpg"
                  alt="Campusly App"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Everything You Need On Campus
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border">
            <Calendar className="text-violet-600 mb-4" size={36} />
            <h3 className="font-bold text-lg">Events</h3>
            <p className="text-gray-600 mt-2">
              Discover workshops, seminars, competitions, and campus events.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border">
            <ShoppingBag className="text-violet-600 mb-4" size={36} />
            <h3 className="font-bold text-lg">Marketplace</h3>
            <p className="text-gray-600 mt-2">
              Buy and sell books, gadgets, and other student essentials.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border">
            <Bell className="text-violet-600 mb-4" size={36} />
            <h3 className="font-bold text-lg">Notifications</h3>
            <p className="text-gray-600 mt-2">
              Never miss important updates and announcements.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border">
            <MessageCircle className="text-violet-600 mb-4" size={36} />
            <h3 className="font-bold text-lg">Real-time Chat</h3>
            <p className="text-gray-600 mt-2">
              Connect with classmates and teachers instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Explore Campusly
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <img
              src="/screenshots/home.jpg"
              alt="Home"
              className="rounded-3xl shadow-lg"
            />

            <img
              src="/screenshots/marketplace.jpg"
              alt="Marketplace"
              className="rounded-3xl shadow-lg"
            />

            <img
              src="/screenshots/events.jpg"
              alt="Events"
              className="rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-linear-to-r from-violet-600 to-indigo-700 rounded-[40px] p-12 text-center text-white">
          <Smartphone size={64} className="mx-auto mb-6" />

          <h2 className="text-4xl font-bold">
            Download Campusly Today
          </h2>

          <p className="mt-4 text-violet-100 text-lg">
            Join your campus community, stay informed, and make student life
            easier than ever.
          </p>

          <a
            href="/Campusly.apk"
            download
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-white text-violet-700 rounded-2xl font-bold hover:scale-105 transition"
          >
            <Download size={20} />
            Download Latest APK
          </a>

          <p className="mt-4 text-sm text-violet-200">
            Android 8.0+ • Version 2.1 • Secure & Free
          </p>
        </div>
      </section>
    </div>
  );
}