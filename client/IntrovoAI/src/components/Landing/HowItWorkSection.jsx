import { Link } from "react-router-dom";

const steps = [
  "Choose role & difficulty",
  "Answer AI-generated questions",
  "Get instant AI feedback",
  "Follow your learning roadmap",
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold">How It Works</h2>

        <div className="mt-8 grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <span className="text-blue-600 font-bold text-xl">{i + 1}</span>
              <p className="mt-2">{step}</p>
            </div>
          ))}
        </div>

        <Link
          to="/how-it-works"
          className="inline-block mt-8 text-blue-600 font-semibold"
        >
          Learn More →
        </Link>
      </div>
    </section>
  );
};

export default HowItWorksSection;
