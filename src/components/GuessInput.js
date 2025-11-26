import React, { useState } from "react";

const GuessInput = ({ onGuess, disabled }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onGuess(inputValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="guess-form">
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите число от 1 до 100"
        min="1"
        max="100"
        disabled={disabled}
        className="guess-input"
      />
      <button
        type="submit"
        disabled={disabled || !inputValue.trim()}
        className="guess-button"
      >
        Проверить
      </button>
    </form>
  );
};

export default GuessInput;
