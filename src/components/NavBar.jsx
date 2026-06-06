import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div> */}
            <h1 className="text-3xl font-bold text-slate-900">Campusly</h1>
          </div>

          <div className="hidden md:flex gap-10 text-slate-700">
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/market">MarketPlace</Link>
            <Link to="/lostfound">Lost&Found</Link>
            <Link to="/profile">Profile</Link>
          </div>

          <div className="flex gap-4">
            <Link to="/login">
              <button className="px-6 py-2 border rounded-xl hover:bg-gray-100">
                Login
              </button>
            </Link>

            <Link to="/login">
              <button className="px-6 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
