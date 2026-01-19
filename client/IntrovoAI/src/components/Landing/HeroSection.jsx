import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="text-center max-w-3xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          AI-Powered Mock Interviews for Placements
        </h1>

        <p className="mt-4 text-lg text-blue-100">
          Practice real interview questions, get AI-driven feedback, and receive
          a personalized learning roadmap.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/demo"
            className="bg-white text-blue-600 px-6 py-3 rounded font-semibold"
          >
            Try Demo
          </Link>

          <Link
            to="/login"
            className="border border-white px-6 py-3 rounded font-semibold"
          >
            Start Interview
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
