"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import OpenAI from "openai";
const ChatbotBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const toggleChat = () => setIsOpen(!isOpen);
  const [threadId, setThreadId] = useState<string | null>(null);

  useEffect(() => {
    // Load thread_id from localStorage on component mount
    const storedThreadId = localStorage.getItem("thread_id");
    if (storedThreadId) {
      setThreadId(storedThreadId);
    } else {
      createThread(); // Create thread if not found
    }
  }, []);
  const createThread = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/chatgpt/assistant/createThread",
      );
      const newThreadId = response.data?.threadId;
      if (newThreadId) {
        localStorage.setItem("thread_id", newThreadId); // Save to localStorage
        setThreadId(newThreadId); // Update state
      }
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, `You: ${userMessage}`]);
    setInput("");
    console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY);
    try {
      const response = await fetch(
        `http://localhost:8080/api/chatgpt/assistant/sendMessage/asst_dHbO7vLN4NyODS7FGNWUH7Pf/${threadId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage }),
        },
      );
      console.log(threadId);
      const data = await response.json();
      const botMessage = data.message;
      setMessages((prev) => [...prev, `Bot: ${botMessage}`]);
    } catch (error) {
      setMessages((prev) => [...prev, "Bot: Sorry, something went wrong."]);
      console.error(error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen && (
        <div className="flex h-96 w-80 flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-lg font-semibold">Chatbot</h4>
            <button onClick={toggleChat} className="text-gray-500">
              ✕
            </button>
          </div>
          <div className="mb-2 flex-grow overflow-y-auto">
            {messages.map((msg, index) => (
              <p key={index} className="mb-1 text-sm">
                {msg}
              </p>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="mr-2 flex-grow rounded border p-2"
            />
            <Button onClick={handleSend} disabled={!input.trim()}>
              Send
            </Button>
          </div>
        </div>
      )}
      <Button
        onClick={toggleChat}
        variant="outline"
        className="flex h-16 w-16 items-center justify-center rounded-full"
      >
        💬
      </Button>
    </div>
  );
};

export default ChatbotBubble;
