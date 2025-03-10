import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import ChatUI from './components/Chatbot/Chatbot';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ChatUI />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
