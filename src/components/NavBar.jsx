import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to='/' className="text-3xl font-bold text-slate-900">
          Campusly
        </Link>

        {/* Desktop Navigation */}
        {user && (
          <div className="hidden md:flex gap-8 text-slate-700 font-medium">
            <div className="hidden md:flex gap-10">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-violet-600 font-semibold border-b-2 border-violet-600 pb-1"
                    : "text-slate-700 hover:text-violet-600 transition"
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/events"
                className={({ isActive }) =>
                  isActive
                    ? "text-violet-600 font-semibold border-b-2 border-violet-600 pb-1"
                    : "text-slate-700 hover:text-violet-600 transition"
                }
              >
                Events
              </NavLink>

              <NavLink
                to="/market"
                className={({ isActive }) =>
                  isActive
                    ? "text-violet-600 font-semibold border-b-2 border-violet-600 pb-1"
                    : "text-slate-700 hover:text-violet-600 transition"
                }
              >
                Marketplace
              </NavLink>

              <NavLink
                to="/lostfound"
                className={({ isActive }) =>
                  isActive
                    ? "text-violet-600 font-semibold border-b-2 border-violet-600 pb-1"
                    : "text-slate-700 hover:text-violet-600 transition"
                }
              >
                Lost & Found
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-violet-600 font-semibold border-b-2 border-violet-600 pb-1"
                    : "text-slate-700 hover:text-violet-600 transition"
                }
              >
                Profile
              </NavLink>
            </div>

            {user?.role === "admin" && (
              <NavLink to="/admin/users"
                className={({ isActive }) =>
                  isActive
                    ? "text-violet-600 font-semibold border-b-2 border-violet-600 pb-1"
                    : "text-slate-700 hover:text-violet-600 transition"
                }>
                Admin Panel
              </NavLink>
            )}
          </div>
        )}
        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          {!user ? (
            <>
              <Link to="/login">
                <button className="px-6 py-2 border rounded-xl hover:bg-gray-100">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="px-6 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700">
                  Sign Up
                </button>
              </Link>
            </>
          ) : null}

          <Link to="/download">
            <button className="px-6 py-2 border rounded-xl hover:bg-gray-100">
              Get App
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4">

          {user && (
            <div className="flex flex-col gap-4 text-slate-700 font-medium mb-4">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <Link to="/events" onClick={() => setMenuOpen(false)}>
                Events
              </Link>

              <Link to="/market" onClick={() => setMenuOpen(false)}>
                Marketplace
              </Link>

              <Link to="/lostfound" onClick={() => setMenuOpen(false)}>
                Lost & Found
              </Link>
              <Link to="/chat" onClick={() => setMenuOpen(false)}>
                Chat
              </Link>

              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin/users"
                  onClick={() => setMenuOpen(false)}
                  className="text-red-600 font-semibold"
                >
                  Admin Panel
                </Link>
              )}
            </div>

          )}


          <div className="flex flex-col gap-3">
            {!user && (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <button className="w-full px-6 py-3 border rounded-xl">
                    Login
                  </button>
                </Link>

                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  <button className="w-full px-6 py-3 bg-violet-600 text-white rounded-xl">
                    Sign Up
                  </button>
                </Link>
              </>
            )}

            <Link to="/download" onClick={() => setMenuOpen(false)}>
              <button className="w-full px-6 py-3 border rounded-xl">
                Get App
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;