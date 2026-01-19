const QuestionCard = ({ question, index }) => (
  <div className="bg-white p-4 rounded shadow">
    <p className="text-gray-500">Question {index + 1}</p>
    <h2 className="text-lg font-semibold mt-2">{question.questionText}</h2>
  </div>
);

export default QuestionCard;
