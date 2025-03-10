import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chatbot.css"; // Ensure this file has the updated CSS
import Navbar from "../Navbar/Navbar";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "user" };
      setMessages([...messages, newMessage]);
      setInput("");

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/chatbot/chatbot/",
          { question: input }
        );
        const botResponse = { text: response.data.answer, sender: "bot" };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        const botErrorResponse = {
          text: "Sorry, something went wrong.",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botErrorResponse]);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const renderCodeBlock = (code) => {
    return (
      <pre className="bg-dark text-white p-3 rounded">
        <code>{code}</code>
      </pre>
    );
  };

  const formatResponseText = (text) => {
    const codeRegex = /```(.*?)```/gs;
    return text.split(codeRegex).map((part, index) =>
      index % 2 === 1 ? renderCodeBlock(part.trim()) : <span key={index}>{part}</span>
    );
  };

  return (
    <>
      <Navbar />
      <div className="chat-container">
        <div className="chat-header">💬 Chat with AI</div>
        <div className="chat-body">
          <div className="messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.sender === "user" ? "user-message" : "bot-message"}>
                {msg.sender === "user" ? msg.text : <div>{formatResponseText(msg.text)}</div>}
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            placeholder="Ask a question..."
          />
          <button onClick={handleSendMessage}>Send</button>
          <button className="clear-btn" onClick={handleClearChat}>
            Clear
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatUI;
