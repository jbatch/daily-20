import { useState, useEffect } from "react";
import { Header } from "./Header";
import { NumberDisplay } from "./NumberDisplay";
import { GameGrid } from "./GameGrid";
import { ResultsDialog } from "./ResultsDialog";

// Game configuration
const TOTAL_NUMBERS = 20; // Changed from 20 for testing

// Simple seeded random number generator
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

const D20Game = () => {
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [placedNumbers, setPlacedNumbers] = useState<Array<number | null>>(
    Array(TOTAL_NUMBERS).fill(null)
  );
  const [numberQueue, setNumberQueue] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [evaluatedScores, setEvaluatedScores] = useState<number[]>([]);

  // Initialize the game with seeded random numbers
  useEffect(() => {
    const date = new Date();
    const dateStr = date.toISOString().split("T")[0];
    const seed = parseInt(dateStr.replace(/-/g, ""));

    // Generate numbers for the game
    const numbers = Array(TOTAL_NUMBERS)
      .fill(0)
      .map((_, i) => Math.floor(seededRandom(seed + i) * 999) + 1);
    setNumberQueue(numbers);
    setCurrentNumber(numbers[0]);
  }, []);

  const evaluatePlacements = (finalNumbers: (number | null)[]) => {
    // Create a mapping of number to its correct position
    const sortedNumbers = [...numberQueue].sort((a, b) => a - b);
    const correctPositions = new Map(
      sortedNumbers.map((num, index) => [num, index])
    );

    // Calculate how far each number is from its ideal position
    const scores = finalNumbers.map((num, currentPos) => {
      if (num === null) return 0;
      const correctPos = correctPositions.get(num)!;
      const maxDistance = TOTAL_NUMBERS - 1;
      const distance = Math.abs(currentPos - correctPos);
      return 1 - distance / maxDistance; // 1 = perfect, 0 = worst possible
    });

    return scores;
  };

  const handleGameComplete = (finalNumbers: (number | null)[]) => {
    const scores = evaluatePlacements(finalNumbers);
    setEvaluatedScores(scores);
    setIsRevealing(true);

    // Show the results dialog after the animation
    setTimeout(() => {
      setShowResults(true);
    }, scores.length * 500 + 500); // Wait for all cells to animate plus a bit extra
  };

  const handleCellClick = (index: number) => {
    if (
      placedNumbers[index] !== null ||
      currentNumber === null ||
      currentIndex >= TOTAL_NUMBERS
    ) {
      return;
    }

    const newPlacedNumbers = [...placedNumbers];
    newPlacedNumbers[index] = currentNumber;
    setPlacedNumbers(newPlacedNumbers);

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    if (nextIndex === TOTAL_NUMBERS) {
      setCurrentNumber(null);
      handleGameComplete(newPlacedNumbers);
    } else {
      setCurrentNumber(numberQueue[nextIndex]);
    }
  };

  const countCorrectPlacements = () => {
    return evaluatedScores.filter((score) => score === 1).length;
  };

  const calculateFinalScore = () => {
    if (evaluatedScores.length === 0) return 0;
    const sum = evaluatedScores.reduce((acc, score) => acc + score, 0);
    return Math.floor(100 * (sum / evaluatedScores.length));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4">
      <ResultsDialog
        open={showResults}
        onOpenChange={setShowResults}
        correctPlacements={countCorrectPlacements()}
        total={TOTAL_NUMBERS}
        score={calculateFinalScore()}
        evaluatedScores={evaluatedScores}
      />

      <Header onStatsClick={() => {}} onShareClick={() => {}} />

      <NumberDisplay currentNumber={currentNumber} />

      <GameGrid
        placedNumbers={placedNumbers}
        onCellClick={handleCellClick}
        isRevealing={isRevealing}
        evaluatedScores={evaluatedScores}
      />
    </div>
  );
};

export default D20Game;
