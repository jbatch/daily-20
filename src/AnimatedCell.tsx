import React from "react";

interface AnimatedCellProps {
  number: number | null;
  score: number; // 0 to 1, where 1 is perfect placement
}

export const AnimatedCell: React.FC<AnimatedCellProps> = ({
  number,
  score,
}) => {
  // Get color matching emoji thresholds:
  // Red (0-0.5) -> Orange (0.5-0.75) -> Yellow (0.75-1.0) -> Green (1.0)
  const getColor = (score: number): string => {
    if (score === 1) {
      return "rgb(0, 200, 0)"; // Green
    }
    if (score >= 0.75) {
      // Transition from orange to yellow (0.75 -> 1.0)
      const ratio = (score - 0.75) * 4; // normalize to 0-1
      const red = 255;
      const green = Math.round(200 + 55 * ratio);
      return `rgb(${red}, ${green}, 0)`;
    }
    if (score >= 0.5) {
      // Transition from red to orange (0.5 -> 0.75)
      const ratio = (score - 0.5) * 4; // normalize to 0-1
      const red = 255;
      const green = Math.round(140 + 60 * ratio);
      return `rgb(${red}, ${green}, 0)`;
    }
    // Red with slight variation for scores under 0.5
    const green = Math.round(score * 140 * 2); // Gradually add some green for visual interest
    return `rgb(255, ${green}, 0)`;
  };

  return (
    <div
      className={`aspect-square rounded-lg border flex items-center justify-center text-2xl font-bold
        transition-all duration-300 ease-out
      `}
      style={{
        backgroundColor: getColor(score),
        opacity: 0.8, // Increased opacity
        textShadow: "0 1px 3px rgba(0,0,0,0.3)",
      }}
    >
      {number}
    </div>
  );
};
