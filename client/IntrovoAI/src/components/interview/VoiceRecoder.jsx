import { useEffect, useRef, useState } from "react";

const VoiceRecorder = ({ onResult }) => {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
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
    recognitionRef.current.start();
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current.stop();
    setListening(false);
  };

  return (
    <button
      onClick={listening ? stopListening : startListening}
      className={`px-4 py-2 rounded text-white ${
        listening ? "bg-red-500" : "bg-purple-600"
      }`}
    >
      {listening ? "Stop Recording" : "🎤 Speak Answer"}
    </button>
  );
};

export default VoiceRecorder;
