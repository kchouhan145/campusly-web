import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-violet-100">
            <span className="text-5xl">🎓</span>
          </div>
        </div>

        <h1 className="text-8xl md:text-9xl font-extrabold text-violet-600">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-slate-900">
          Lost on Campus?
        </h2>

        <p className="mt-4 text-lg text-slate-600">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to Campusly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Link
            to="/"
            className="px-8 py-4 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition"
          >
            Go Home
          </Link>

          <Link
            to="/login"
            className="px-8 py-4 border border-violet-600 text-violet-600 rounded-xl font-semibold hover:bg-violet-50 transition"
          >
            Login
          </Link>
        </div>

        <div className="mt-12 text-sm text-slate-500">
          Campusly • Connect • Collaborate • Grow
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;