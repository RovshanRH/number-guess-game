import React, { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  generateRandomNumber,
  checkGuess,
  calculateStats,
} from "../utils/gameLogic";
import GuessInput from "./GuessInput";
import GuessHistory from "./GuessHistory";
import GameStats from "./GameStats";
import RestartButton from "./RestartButton";

const Game = () => {
  const [targetNumber, setTargetNumber] = useState(() =>
    generateRandomNumber()
  );
  const [history, setHistory] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameHistory, setGameHistory] = useLocalStorage(
    "numberGuessGameHistory",
    []
  );

  const currentAttempts = history.length;

  const handleGuess = useCallback(
    (guess) => {
      const result = checkGuess(guess, targetNumber);

      const newAttempt = {
        guess: parseInt(guess),
        message: result.message,
        difference: result.difference,
        timestamp: new Date().toISOString(),
      };

      setHistory((prev) => [...prev, newAttempt]);

      if (result.isCorrect) {
        setGameCompleted(true);

        // Сохраняем завершенную игру в историю
        const completedGame = {
          attempts: currentAttempts + 1,
          targetNumber,
          completedAt: new Date().toISOString(),
          isCompleted: true,
        };

        setGameHistory((prev) => [...prev, completedGame]);
      }
    },
    [targetNumber, currentAttempts, setGameHistory]
  );

  const handleRestart = useCallback(() => {
    setTargetNumber(generateRandomNumber());
    setHistory([]);
    setGameCompleted(false);
  }, []);

  // Автоперезапуск при изменении targetNumber
  useEffect(() => {
    setHistory([]);
    setGameCompleted(false);
  }, [targetNumber]);

  const stats = calculateStats(gameHistory);

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>Угадай число</h1>
        <p>Я загадал число от 1 до 100. Попробуй угадать!</p>
      </header>

      <div className="game-content">
        <div className="game-controls">
          <GuessInput onGuess={handleGuess} disabled={gameCompleted} />

          <RestartButton
            onRestart={handleRestart}
            gameCompleted={gameCompleted}
          />
        </div>

        {gameCompleted && (
          <div className="victory-message">
            🎉 {history[history.length - 1]?.message} 🎉
          </div>
        )}

        <div className="game-info">
          <GuessHistory history={history} />
          <GameStats currentAttempts={currentAttempts} stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default Game;
