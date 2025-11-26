import React from "react";

const GameStats = ({ currentAttempts, stats }) => {
  return (
    <div className="game-stats">
      <h3>Статистика</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Текущие попытки:</span>
          <span className="stat-value">{currentAttempts}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Среднее за игру:</span>
          <span className="stat-value">{stats.attempts}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Рекорд:</span>
          <span className="stat-value">{stats.minAttempts || "-"}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Сыграно игр:</span>
          <span className="stat-value">{stats.gamesPlayed}</span>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
