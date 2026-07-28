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
      <div className="space-y-6 p-5 sm:p-8">
        <header className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Practice workspace
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
            Build your mock interview
          </h1>
          <p className="mt-2 text-slate-600">
            Choose a fast role-based session, upload a resume, or customize the
            exact domain and topics you want to practice.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.75fr)]">
          <CustomInterview />
          <div className="space-y-5">
            <ResumeInterview />
            <StartInterview />
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentIndex];

  if (!question) {
    return (
      <div className="p-5 sm:p-8">
        <div className="mx-auto max-w-2xl rounded-lg border border-teal-200 bg-teal-50 p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Interview completed
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Great work. Review your dashboard for trends and roadmap actions.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 p-5 sm:p-8">
      <QuestionCard
        question={question}
        index={currentIndex}
        total={questions.length}
      />
      <AnswerBox questionIndex={currentIndex} totalQuestions={questions.length} />
    </div>
  );
};

export default Interview;
