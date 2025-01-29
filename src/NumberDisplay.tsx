import React from "react";

interface NumberDisplayProps {
  currentNumber: number | null;
}

export const NumberDisplay: React.FC<NumberDisplayProps> = ({
  currentNumber,
}) => {
  return (
    <div className="w-full max-w-lg mb-6">
      <div className="text-center p-4 rounded-lg border bg-card">
        <div className="text-sm text-muted-foreground mb-1">Current Number</div>
        <div className="text-4xl font-bold">
          {currentNumber ?? "Game Complete"}
        </div>
      </div>
    </div>
  );
};
