import { Box, Button } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import React from "react";

const CHATGPT_API_URL = "http://127.0.0.1:5000/chatgpt";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const speakResponse = (text: string) => {
  if (!window.speechSynthesis) {
    console.error("Speech Synthesis not supported in this browser.");
    return;
  }
  const utterance = new window.SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
};

export const ChatGPTButton = () => {
  const [userQuestion, setUserQuestion] = React.useState<string>("");
  const [chatGPTResponse, setChatGPTResponse] = React.useState<string>("");
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const recognitionRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (userQuestion === "") return;
    const fetchChatGPTResponse = () => {
      fetch(CHATGPT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_message: userQuestion }),
      })
        .then((response) => response.json())
        .then((data) => {
          setChatGPTResponse(data.response);
        })
        .catch((error) => {
          console.error("Error fetching ChatGPT response:", error);
        });
    };
    fetchChatGPTResponse();
  }, [userQuestion]);

  React.useEffect(() => {
    if (chatGPTResponse === "") return;
    speakResponse(chatGPTResponse);
    setChatGPTResponse("");
  }, [chatGPTResponse]);

  // Code taken from https://www.geeksforgeeks.org/speech-recognition-in-javascript-using-web-speech-api/
  React.useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        }
      }
      if (finalTranscript.trim()) {
        setUserQuestion(finalTranscript.trim());
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleStartRecording = () => {
    if (recognitionRef.current && !isRecording) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"33%"}
    >
      <Button
        fullWidth
        sx={{
          height: "100%",
          backgroundColor: isRecording
            ? "var(--color-accent-soft)"
            : "var(--color-accent)",
          color: isRecording
            ? "var(--color-text-main)"
            : "var(--color-text-accent)",
          "&:hover": {
            backgroundColor: "var(--color-accent-soft)",
            color: "var(--color-text-main)",
          },
          transition: "background-color 0.2s ease",
        }}
        variant="contained"
        onMouseDown={handleStartRecording}
        onMouseUp={handleStopRecording}
        onMouseLeave={handleStopRecording}
        onTouchStart={handleStartRecording}
        onTouchEnd={handleStopRecording}
      >
        <MicIcon
          sx={{
            width: "100%",
            height: "100%",
            animation: isRecording ? "pulse 1.5s ease-in-out infinite" : "none",
            "@keyframes pulse": {
              "0%, 100%": {
                opacity: 1,
              },
              "50%": {
                opacity: 0.5,
              },
            },
          }}
        />
      </Button>
    </Box>
  );
};
