import { useState } from "react";
import { startResumeinterview } from "../../services/interview_api";
import { useInterview } from "../../context/InterviewContext";

const ResumeInterview = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { startSession } = useInterview();

  const handleStart = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await startResumeinterview(formData);
      startSession(res.data.sessionId, res.data.questions);
    } catch (startError) {
      console.error("Resume interview failed", startError);
      setError(
        startError.response?.data?.message ||
          "Could not generate resume-based questions."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          Resume mode
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-950">
          Resume-based interview
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Upload a PDF resume and practice questions from your own projects and
          skills.
        </p>
      </div>

      <label className="mt-5 block rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
        <span className="text-sm font-semibold text-slate-700">
          Resume PDF
        </span>
        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-3 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
        />
        {file && (
          <p className="mt-2 text-sm font-medium text-teal-700">{file.name}</p>
        )}
      </label>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleStart}
        disabled={!file || loading}
        className="mt-5 min-h-11 w-full rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {loading ? "Reading resume..." : "Start resume interview"}
      </button>
    </section>
  );
};

export default ResumeInterview;
