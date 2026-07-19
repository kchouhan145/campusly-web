import {
  // Github,
  // ExternalLink,
  Smartphone,
  Globe,
  Server,
  Database,
  MessageCircle,
  Calendar,
  ShoppingBag,
  Bell,
  Users,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";


export default function GitLinks() {
  const repos = [
    {
      title: "Backend API",
      icon: <Server className="w-8 h-8 text-blue-600" />,
      description:
        "Node.js + Express REST API with JWT Authentication, MongoDB, Cloudinary, Firebase Notifications and Socket.io.",
      link: "https://github.com/kchouhan145/campusly-backend",
    },
    {
      title: "Web Frontend",
      icon: <Globe className="w-8 h-8 text-green-600" />,
      description:
        "Responsive React + Vite application built with Tailwind CSS for students and faculty.",
      link: "https://github.com/kchouhan145/campusly-web",
    },
    {
      title: "Mobile App",
      icon: <Smartphone className="w-8 h-8 text-purple-600" />,
      description:
        "React Native application providing the complete Campusly experience on Android.",
      link: "https://github.com/kchouhan145/campusly-mobile",
    },
  ];

  const features = [
    {
      icon: <Users />,
      title: "Campus Community",
    },
    {
      icon: <MessageCircle />,
      title: "Real-time Chat",
    },
    {
      icon: <Calendar />,
      title: "Events",
    },
    {
      icon: <ShoppingBag />,
      title: "Marketplace",
    },
    {
      icon: <Bell />,
      title: "Announcements",
    },
    {
      icon: <Database />,
      title: "Lost & Found",
    },
  ];

  const tech = [
    "React",
    "React Native",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Socket.io",
    "JWT",
    "Tailwind CSS",
    "Firebase",
    "Cloudinary",
    "Render",
    "Vercel",
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Hero */}

        {/* <div className="rounded-3xl bg-linear-to-r from-indigo-700 to-blue-600 text-white p-12 shadow-xl">

          <h1 className="text-5xl font-bold">
            Campusly
          </h1>

          <p className="mt-4 text-xl text-blue-100 max-w-3xl">
            A full-stack campus management and social networking platform
            connecting students, faculty and administrators through one
            integrated ecosystem.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="https://campuslyweb.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold flex items-center gap-2"
            >
              <ExternalLink size={18} />
              Live Website
            </a>

            <a
              href="https://github.com/kchouhan145"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-white rounded-xl flex items-center gap-2"
            >
              <FaGithub size={18} />
              GitHub
            </a>
          </div>
        </div> */}

        {/* Stats */}

        {/* <div className="grid md:grid-cols-4 gap-6 mt-10">

          {[
            "Students",
            "Faculty",
            "Marketplace",
            "Announcements",
          ].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl p-8 text-center shadow"
            >
              <h3 className="text-3xl font-bold text-indigo-600">✓</h3>
              <p className="mt-3 font-semibold">{item}</p>
            </div>
          ))}
        </div> */}

        {/* Repositories */}

        <h2 className="text-3xl font-bold mt-16 mb-8">
          Project Repositories
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {repos.map((repo) => (
            <div
              key={repo.title}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              {repo.icon}

              <h3 className="text-2xl font-bold mt-4">
                {repo.title}
              </h3>

              <p className="text-gray-600 mt-4">
                {repo.description}
              </p>

              <a
                href={repo.link}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-blue-600 font-semibold"
              >
                <FaGithub size={18} />
                View Repository
              </a>
            </div>
          ))}
        </div>

        {/* Features */}

        <h2 className="text-3xl font-bold mt-16 mb-8">
          Key Features
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl shadow p-6 text-center"
            >
              <div className="flex justify-center text-blue-600">
                {feature.icon}
              </div>

              <p className="mt-4 font-medium">
                {feature.title}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}

        <h2 className="text-3xl font-bold mt-16 mb-8">
          Technology Stack
        </h2>

        <div className="bg-white rounded-2xl shadow p-8 flex flex-wrap gap-4">
          {tech.map((item) => (
            <span
              key={item}
              className="px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}