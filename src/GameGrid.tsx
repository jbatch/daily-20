import React from "react";
import { AnimatedCell } from "./AnimatedCell";

interface GameGridProps {
  placedNumbers: Array<number | null>;
  onCellClick: (index: number) => void;
  isRevealing?: boolean;
  evaluatedScores?: number[];
}

const Cell: React.FC<{
  index: number;
  number: number | null;
  onClick: () => void;
  disabled: boolean;
  total: number;
}> = ({ index, number, onClick, disabled, total }) => {
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const label = isFirst ? "Lowest" : isLast ? "Highest" : null;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        aspect-square rounded-lg border transition-colors 
        flex flex-col items-center
        ${
          number === null
            ? "bg-card hover:bg-accent cursor-pointer"
            : "bg-primary/10 cursor-not-allowed"
        }
        relative
      `}
    >
      {label && (
        <span className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 text-xs bg-background/80 text-foreground rounded-full border shadow-sm">
          {label}
        </span>
      )}
      <span className="flex-1 flex items-center justify-center text-xl font-semibold">
        {number}
      </span>
    </button>
  );
};

const AnimatedCellWithLabel: React.FC<{
  index: number;
  number: number | null;
  score: number;
  total: number;
}> = ({ index, number, score, total }) => {
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const label = isFirst ? "Lowest" : isLast ? "Highest" : null;

  return (
    <div className="relative">
      {label && (
        <span className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 text-xs bg-background/80 text-foreground rounded-full border shadow-sm z-10">
          {label}
        </span>
      )}
      <AnimatedCell number={number} score={score} />
    </div>
  );
};

export const GameGrid: React.FC<GameGridProps> = ({
  placedNumbers,
  onCellClick,
  isRevealing = false,
  evaluatedScores = [],
}) => {
  const [revealingCells, setRevealingCells] = React.useState(
    new Array(placedNumbers.length).fill(false)
  );

  React.useEffect(() => {
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
      {/* Main grid with gradient background */}
      <div className="relative rounded-xl p-2 bg-gradient-to-br from-blue-100/20 to-red-300/20">
        {/* Grid cells */}
        <div className="grid grid-cols-4 gap-2 relative">
          {placedNumbers.map((number, index) =>
            isRevealing && revealingCells[index] ? (
              <AnimatedCellWithLabel
                key={index}
                index={index}
                number={number}
                score={evaluatedScores[index] || 0}
                total={placedNumbers.length}
              />
            ) : (
              <Cell
                key={index}
                index={index}
                number={number}
                onClick={() => onCellClick(index)}
                disabled={number !== null}
                total={placedNumbers.length}
              />
            )
          )}
        </div>
      </div>

      {/* Bottom hint text */}
      <div className="text-center text-sm text-muted-foreground mt-2">
        Place numbers in order from lowest to highest
      </div>
    </div>
  );
};
