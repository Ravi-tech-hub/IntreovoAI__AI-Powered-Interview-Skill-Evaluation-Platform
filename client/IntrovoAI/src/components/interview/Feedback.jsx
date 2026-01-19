const Feedback = ({ feedback }) => {
  if (!feedback) return null;

  return (
    <div className="bg-gray-100 p-4 rounded mt-4">
      <p>
        <strong>Score:</strong> {feedback.score}/10
      </p>

      <p className="mt-2 font-semibold">Strengths</p>
      <ul className="list-disc ml-5">
        {(feedback.strengths || []).map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <p className="mt-2 font-semibold">Weaknesses</p>
      <ul className="list-disc ml-5">
        {(feedback.weaknesses || []).map((w, i) => (
          <li key={i}>{w}</li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;
