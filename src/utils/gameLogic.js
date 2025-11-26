export const generateRandomNumber = (min = 1, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const checkGuess = (guess, targetNumber) => {
  const guessNum = parseInt(guess);

  if (isNaN(guessNum)) {
    return { isValid: false, message: "Пожалуйста, введите число" };
  }

  if (guessNum < 1 || guessNum > 100) {
    return { isValid: false, message: "Число должно быть от 1 до 100" };
  }

  if (guessNum === targetNumber) {
    return {
      isValid: true,
      isCorrect: true,
      message: "Поздравляем! Вы угадали число!",
    };
  }

  return {
    isValid: true,
    isCorrect: false,
    message:
      guessNum > targetNumber ? "Слишком большое!" : "Слишком маленькое!",
    difference: Math.abs(guessNum - targetNumber),
  };
};

export const calculateStats = (history) => {
  if (history.length === 0)
    return { attempts: 0, minAttempts: 0, gamesPlayed: 0 };

  const completedGames = history.filter((game) => game.isCompleted);
  const attempts =
    completedGames.length > 0
      ? Math.round(
          completedGames.reduce((sum, game) => sum + game.attempts, 0) /
            completedGames.length
        )
      : 0;

  const minAttempts =
    completedGames.length > 0
      ? Math.min(...completedGames.map((game) => game.attempts))
      : 0;

  return {
    attempts,
    minAttempts,
    gamesPlayed: completedGames.length,
  };
};
