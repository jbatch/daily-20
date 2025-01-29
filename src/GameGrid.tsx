import React, { useEffect, useState } from "react";
import { AnimatedCell } from "./AnimatedCell";

interface GameGridProps {
  placedNumbers: Array<number | null>;
  onCellClick: (index: number) => void;
  isRevealing?: boolean;
  evaluatedScores?: number[];
}

export const GameGrid: React.FC<GameGridProps> = ({
  placedNumbers,
  onCellClick,
  isRevealing = false,
  evaluatedScores = [],
}) => {
  const [revealingCells, setRevealingCells] = useState(
    new Array(placedNumbers.length).fill(false)
  );

  useEffect(() => {
    if (isRevealing) {
      // Reset the revealing state when starting a new reveal
      setRevealingCells(new Array(placedNumbers.length).fill(false));

      // Start revealing cells one by one
      placedNumbers.forEach((_, index) => {
        setTimeout(() => {
          setRevealingCells((prev) => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
        }, index * 300); // Smaller delay for smoother animation
      });
    }
  }, [isRevealing, placedNumbers, placedNumbers.length]);

  return (
    <div className="w-full max-w-lg mb-8">
      {/* Direction hint text */}
      <div className="flex justify-between text-sm text-muted-foreground mb-2 px-2">
        <span>Lower numbers</span>
        <span>Higher numbers</span>
      </div>

      {/* Main grid with gradient background */}
      <div className="relative rounded-xl p-2 bg-gradient-to-br from-blue-100/20 to-red-300/20">
        {/* Grid cells */}
        <div className="grid grid-cols-4 gap-2 relative">
          {placedNumbers.map((number, index) =>
            isRevealing && revealingCells[index] ? (
              <AnimatedCell
                key={index}
                number={number}
                score={evaluatedScores[index] || 0}
              />
            ) : (
              <button
                key={index}
                onClick={() => onCellClick(index)}
                disabled={number !== null}
                className={`aspect-square rounded-lg border transition-colors flex items-center justify-center text-xl font-semibold
                  ${
                    number === null
                      ? "bg-card hover:bg-accent cursor-pointer"
                      : "bg-primary/10 cursor-not-allowed"
                  }`}
              >
                {number}
              </button>
            )
          )}
        </div>
      </div>

      {/* Bottom hint text */}
      <div className="text-center text-sm text-muted-foreground mt-2">
        Place numbers in ascending order diagonally
      </div>
    </div>
  );
};
