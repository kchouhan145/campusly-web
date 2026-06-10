import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-slate-900">
          Campusly
        </h1>

        {/* Desktop Navigation */}
        {user && (
          <div className="hidden md:flex gap-8 text-slate-700 font-medium">
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/market">Marketplace</Link>
            <Link to="/lostfound">Lost & Found</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/profile">Profile</Link>
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