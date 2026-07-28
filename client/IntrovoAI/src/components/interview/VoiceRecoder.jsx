import { useEffect, useRef, useState } from "react";

const VoiceRecorder = ({ onResult }) => {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [onResult]);

  const startListening = () => {
    recognitionRef.current?.start();
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  if (!supported) {
    return (
      <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
        Voice input is not supported in this browser.
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={listening ? stopListening : startListening}
      className={[
        "min-h-11 rounded-lg px-4 text-sm font-semibold transition",
        listening
          ? "bg-red-600 text-white hover:bg-red-700"
          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
      ].join(" ")}
    >
      {listening ? "Stop voice input" : "Use voice input"}
    </button>
  );
};

export default VoiceRecorder;
