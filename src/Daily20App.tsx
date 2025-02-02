import { useState, useEffect } from "react";
import { Header } from "./Header";
import { NumberDisplay } from "./NumberDisplay";
import { GameGrid } from "./GameGrid";
import { ResultsDialog } from "./ResultsDialog";
import { generateDailyNumbers } from "./random-utils";

const TOTAL_NUMBERS = 20;
const START_DATE = "2025-01-29";

type GameState = {
  currentNumber: number | null;
  placedNumbers: Array<number | null>;
  numberQueue: number[];
  currentIndex: number;
  isRevealing: boolean;
  evaluatedScores: number[];
  gameComplete: boolean;
  showResults: boolean;
};

const getGameNumber = (date: Date): number => {
  const startDate = new Date(START_DATE);
  const diffTime = date.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Add 1 since we want Jan 29 to be #1
};

const evaluatePlacements = (
  finalNumbers: Array<number | null>,
  numberQueue: number[]
): number[] => {
  const sortedNumbers = [...numberQueue].sort((a, b) => a - b);
  const correctPositions = new Map(
    sortedNumbers.map((num, index) => [num, index])
  );

  return finalNumbers.map((num, currentPos) => {
    if (num === null) return 0;
    const correctPos = correctPositions.get(num)!;
    const maxDistance = TOTAL_NUMBERS - 1;
    const distance = Math.abs(currentPos - correctPos);
    return 1 - distance / maxDistance;
  });
};

export const Daily20App = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentNumber: null,
    placedNumbers: Array(TOTAL_NUMBERS).fill(null),
    numberQueue: [],
    currentIndex: 0,
    isRevealing: false,
    evaluatedScores: [],
    gameComplete: false,
    showResults: false,
  });

  // Initialize game with daily numbers
  useEffect(() => {
    const dateStr = new Date().toISOString().split("T")[0];
    const numbers = generateDailyNumbers(dateStr, TOTAL_NUMBERS);

    setGameState((prev) => ({
      ...prev,
      numberQueue: numbers,
      currentNumber: numbers[0],
    }));
  }, []);

  const handleGameComplete = (finalNumbers: Array<number | null>) => {
    const scores = evaluatePlacements(finalNumbers, gameState.numberQueue);

    setGameState((prev) => ({
      ...prev,
      evaluatedScores: scores,
      isRevealing: true,
      gameComplete: true,
    }));

    // Show results dialog after reveal animation
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        showResults: true,
      }));
    }, scores.length * 300);
  };

  const handleCellClick = (index: number) => {
    const { currentNumber, placedNumbers, currentIndex, numberQueue } =
      gameState;

    if (
      placedNumbers[index] !== null ||
      currentNumber === null ||
      currentIndex >= TOTAL_NUMBERS
    ) {
      return;
    }

    const newPlacedNumbers = [...placedNumbers];
    newPlacedNumbers[index] = currentNumber;

    const nextIndex = currentIndex + 1;
    const nextState = {
      ...gameState,
      placedNumbers: newPlacedNumbers,
      currentIndex: nextIndex,
    };

    if (nextIndex === TOTAL_NUMBERS) {
      nextState.currentNumber = null;
      setGameState(nextState);
      handleGameComplete(newPlacedNumbers);
    } else {
      nextState.currentNumber = numberQueue[nextIndex];
      setGameState(nextState);
    }
  };

  const countCorrectPlacements = (): number => {
    return gameState.evaluatedScores.filter((score) => score === 1).length;
  };

  const calculateFinalScore = (): number => {
    const { evaluatedScores } = gameState;
    if (evaluatedScores.length === 0) return 0;
    const sum = evaluatedScores.reduce((acc, score) => acc + score, 0);
    return Math.floor(100 * (sum / evaluatedScores.length));
  };

  const handleShareClick = () => {
    setGameState((prev) => ({
      ...prev,
      showResults: true,
    }));
  };

  const handleResultsDialogChange = (open: boolean) => {
    setGameState((prev) => ({
      ...prev,
      showResults: open,
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4">
      <ResultsDialog
        open={gameState.showResults}
        onOpenChange={handleResultsDialogChange}
        correctPlacements={countCorrectPlacements()}
        total={TOTAL_NUMBERS}
        score={calculateFinalScore()}
        evaluatedScores={gameState.evaluatedScores}
        date={new Date().toISOString().split("T")[0]}
      />

      <Header
        onStatsClick={() => {}}
        onShareClick={handleShareClick}
        day={getGameNumber(new Date())}
        showShare={gameState.gameComplete}
        statsEnabled={false}
      />

      <NumberDisplay currentNumber={gameState.currentNumber} />

      <GameGrid
        placedNumbers={gameState.placedNumbers}
        onCellClick={handleCellClick}
        isRevealing={gameState.isRevealing}
        evaluatedScores={gameState.evaluatedScores}
      />
    </div>
  );
};
