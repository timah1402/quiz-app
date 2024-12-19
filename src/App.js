import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/Homepage';
import WebDevelopment from './pages/WebDevelopment';
import DataStructures from './pages/DataStructures'; // Corrected path
import DataStructuresQuiz from './pages/DataStructuresQuiz'; // Correct path
import Quiz from './pages/Quiz'; // Import the Quiz component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/WebDevelopment" element={<WebDevelopment />} />
        <Route path="/WebDevelopment/quiz/:lessonId" element={<Quiz />} />
        <Route path="/data-structures" element={<DataStructures />} />
        <Route path="/data-structures/quiz/:lessonId" element={<DataStructuresQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
