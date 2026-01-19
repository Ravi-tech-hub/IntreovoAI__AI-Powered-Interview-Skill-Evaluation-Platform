const features = [
  {
    title: "AI-Generated Interviews",
    desc: "Dynamic questions based on role and difficulty.",
  },
  {
    title: "Smart Answer Evaluation",
    desc: "AI evaluates clarity, accuracy, and depth.",
  },
  {
    title: "Personalized Roadmap",
    desc: "Get a custom learning plan based on weaknesses.",
  },
  {
    title: "Performance Analytics",
    desc: "Track improvement across interviews.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">Why IntervoAI?</h2>

        <div className="grid md:grid-cols-4 gap-6 mt-10">
          {features.map((f, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded shadow">
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-gray-600 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
