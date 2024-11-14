import React, { useState } from "react";

const Quiz = ({ question, nicknames, onNicknameSubmit, onAnswerSubmit }) => {
  const [nickname, setNickname] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNicknameChange = (e) => setNickname(e.target.value);

  const handleNicknameSubmit = () => {
    onNicknameSubmit(nickname);
    setNickname("");
  };

  const handleAnswerChange = (option) => setSelectedOption(option);

  const handleAnswerSubmit = () => {
    if (selectedOption) {
      const isCorrect = selectedOption === question.answer;
      onAnswerSubmit(nickname, isCorrect);
      setSubmitted(true);
    }
  };

  if (!nicknames[nickname]) {
    return (
      <div>
        <input
          type="text"
          value={nickname}
          placeholder="Enter your nickname"
          onChange={handleNicknameChange}
        />
        <button onClick={handleNicknameSubmit}>Submit Nickname</button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <h2>{question.question}</h2>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={index}
            disabled={submitted}
            onClick={() => handleAnswerChange(String.fromCharCode(65 + index))}
          >
            {String.fromCharCode(65 + index)}) {option}
          </button>
        ))}
      </div>
      {!submitted && (
        <button onClick={handleAnswerSubmit} disabled={!selectedOption}>Submit Answer</button>
      )}
      {submitted && <p>Correct answer: {question.answer}</p>}
    </div>
  );
};

export default Quiz;
