import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 bg-blue-600 text-white text-center">
      <h2 className="text-3xl font-bold">Ready to Crack Your Interview?</h2>

      <p className="mt-4 text-blue-100">
        Start practicing with AI-powered mock interviews today.
      </p>

      <Link
        to="/login"
        className="inline-block mt-6 bg-white text-blue-600 px-6 py-3 rounded font-semibold"
      >
        Start Interview
      </Link>
    </section>
  );
};

export default CTASection;
