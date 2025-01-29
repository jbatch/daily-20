import React from "react";
import { Button } from "@/components/ui/button";
import { Share, BarChart2 } from "lucide-react";

interface HeaderProps {
  onStatsClick: () => void;
  onShareClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onStatsClick,
  onShareClick,
}) => {
  return (
    <header className="w-full max-w-lg flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">D20</h1>
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" onClick={onStatsClick}>
          <BarChart2 className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onShareClick}>
          <Share className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
