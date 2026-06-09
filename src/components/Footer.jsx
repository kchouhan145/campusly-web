import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Campusly
            </h2>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Connecting students and faculty through events,
              marketplace, announcements, lost & found, and
              campus communication.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
  {/* <li>
    {/* <Link to="/" className="hover:text-violet-400 transition">
      Home
    </Link> */}
  {/* </li> */}

  {/* <li>
    <Link to="/events" className="hover:text-violet-400 transition">
      Events
    </Link>
  </li>

  <li>
    <Link to="/market" className="hover:text-violet-400 transition">
      Marketplace
    </Link>
  </li>

  <li>
    <Link to="/lostfound" className="hover:text-violet-400 transition">
      Lost & Found
    </Link>
  </li> */}

  <li>
    <Link
      to="/download"
      className="hover:text-violet-400 transition font-medium"
    >
        Download App
    </Link>
  </li>
</ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Features
            </h3>

            <ul className="space-y-3">
              <li>📢 Announcements</li>
              <li>🎉 Event Management</li>
              <li>🛒 Campus Marketplace</li>
              <li>💬 Real-Time Chat</li>
              <li>🔔 Notifications</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact
            </h3>

            <ul className="space-y-3">
              <li>📧 support@campusly.com</li>
              <li>🏫 Kurukshetra University</li>
              <li>📍 Haryana, India</li>
            </ul>

            {/* <div className="flex gap-4 mt-6 text-xl">
              <a
                href="#"
                className="hover:text-violet-400 transition"
              >
                🌐
              </a>

              <a
                href="#"
                className="hover:text-violet-400 transition"
              >
                📸
              </a>

              <a
                href="#"
                className="hover:text-violet-400 transition"
              >
                💼
              </a>

              <a
                href="#"
                className="hover:text-violet-400 transition"
              >
                🐦
              </a>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Campusly. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <Link
              to="/privacy"
              className="hover:text-violet-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-violet-400 transition"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}