import React from "react";

const RestartButton = ({ onRestart, gameCompleted }) => {
  return (
    <button
      onClick={onRestart}
      className={`restart-button ${gameCompleted ? "pulse" : ""}`}
    >
      {gameCompleted ? "Сыграть еще раз" : "Новая игра"}
    </button>
  );
};

export default RestartButton;
