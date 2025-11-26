import React from "react";

const GuessHistory = ({ history }) => {
  if (history.length === 0) {
    return <div className="history-empty">Попыток еще не было</div>;
  }

  return (
    <div className="guess-history">
      <h3>История попыток:</h3>
      <ul className="history-list">
        {history.map((attempt, index) => (
          <li key={index} className="history-item">
            <span className="guess-number">{attempt.guess}</span>
            <span className="guess-result">{attempt.message}</span>
            {attempt.difference && (
              <span className="guess-difference">
                (разница: {attempt.difference})
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuessHistory;
