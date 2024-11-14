import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import "./App.css";

const App = () => {
  const [nicknames, setNicknames] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(120); // Timer set to 2 minutes per question

  const questions = [
    {
      question: "Which factor is NOT typically considered when calculating a project budget?",
      options: ["Time", "Technology requirements", "Employee salaries", "Customer preferences"],
      answer: "D"
    },
    // Add more questions here in the same format
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timer === 0 || Object.keys(nicknames).length === questions.length) {
      handleNextQuestion();
    }

    return () => clearInterval(interval);
  }, [timer, nicknames]);

  const handleNicknameSubmit = (nickname) => {
    setNicknames((prev) => ({ ...prev, [nickname]: 0 }));
  };

  const handleAnswerSubmit = (nickname, isCorrect) => {
    setNicknames((prev) => ({
      ...prev,
      [nickname]: prev[nickname] + (isCorrect ? 1 : 0)
    }));
  };

  const handleNextQuestion = () => {
    setTimer(120);
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    const winner = Object.keys(nicknames).reduce((a, b) => (nicknames[a] > nicknames[b] ? a : b));
    return (
      <div className="results">
        <h2>Quiz Results</h2>
        <ul>
          {Object.entries(nicknames).map(([name, score]) => (
            <li key={name}>{name}: {score} points</li>
          ))}
        </ul>
        <h3>Winner: {winner} 🎉</h3>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Quiz Time!</h1>
      <p>Time left: {timer} seconds</p>
      <Quiz
        question={questions[questionIndex]}
        nicknames={nicknames}
        onNicknameSubmit={handleNicknameSubmit}
        onAnswerSubmit={handleAnswerSubmit}
      />
      <button onClick={handleNextQuestion} disabled={timer > 0}>Next</button>
    </div>
  );
};

export default App;
