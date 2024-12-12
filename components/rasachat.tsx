// components/RasaChat.js
"use client";
import { useEffect } from "react";

const RasaChat = () => {
  useEffect(() => {
    // Load the Rasa chat script when the component is mounted
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@rasahq/rasa-chat";
    script.type = "application/javascript";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Access the environment variable for the Rasa API URL
  const rasaUrl =
    process.env.NEXT_PUBLIC_API_RASA_URL; // Default to localhost if not set

  return (
    <div
      id="rasa-chat-widget"
      data-websocket-url={rasaUrl} // Use the environment variable here
    ></div>
  );
};

export default RasaChat;
