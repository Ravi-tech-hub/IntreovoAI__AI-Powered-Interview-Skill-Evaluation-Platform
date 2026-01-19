import StartInterview from "../components/interview/StartInterview";
import QuestionCard from "../components/interview/QuestionCard";
import AnswerBox from "../components/interview/AnswerBox";
import ResumeInterview from "../components/interview/ResumeInterview";
import { useInterview } from "../context/InterviewContext";
import CustomInterview from "../components/interview/CustomInterview";

const Interview = () => {
  const { questions, currentIndex } = useInterview();

  if (!questions.length) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-8">
        <ResumeInterview />

        <div className="flex items-center gap-3">
          <hr className="flex-1" />
          <span className="text-gray-500 text-sm">OR</span>
          <hr className="flex-1" />
        </div>

        <CustomInterview />

        <div className="flex items-center gap-3">
          <hr className="flex-1" />
          <span className="text-gray-500 text-sm">OR</span>
          <hr className="flex-1" />
        </div>

        <StartInterview />
      </div>
    );
  }

  const question = questions[currentIndex];
  if (!question) {
    return (
      <div className="text-center mt-20 text-2xl font-semibold">
        Interview Completed 🎉
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <QuestionCard question={question} index={currentIndex} />
      <AnswerBox questionIndex={currentIndex} />
    </div>
  );
};

export default Interview;
