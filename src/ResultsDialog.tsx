import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  correctPlacements: number;
  total: number;
  score: number;
  evaluatedScores?: number[];
  date?: string;
}

const getScoreEmoji = (score: number): string => {
  if (score === 1) return "🟩";
  if (score >= 0.75) return "🟨";
  if (score >= 0.5) return "🟧";
  return "🟥";
};

const getGameNumber = (date: string): number => {
  const startDate = new Date("2025-01-29");
  const currentDate = new Date(date);
  const diffTime = currentDate.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Add 1 since we want Jan 29 to be #1
};

export const ResultsDialog: React.FC<ResultsDialogProps> = ({
  open,
  onOpenChange,
  correctPlacements,
  total,
  score,
  evaluatedScores = [],
  date,
}) => {
  const { toast } = useToast();

  const generateShareText = (): string => {
    const dateStr = date || new Date().toISOString().split("T")[0];
    const gameNumber = getGameNumber(dateStr);
    const scoreStr = `${score}/100`;

    const emojiRows: string[] = [];
    for (let i = 0; i < evaluatedScores.length; i += 4) {
      const rowEmojis = evaluatedScores
        .slice(i, i + 4)
        .map((score) => getScoreEmoji(score))
        .join("");
      emojiRows.push(rowEmojis);
    }

    return [`D20 #${gameNumber}`, `Score: ${scoreStr}`, "", ...emojiRows].join(
      "\n"
    );
  };

  const handleShare = async (): Promise<void> => {
    const shareText = generateShareText();

    try {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard!",
        description: "Share your score with friends",
      });
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle>Game Complete!</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span>Numbers in sequence:</span>
                <span className="font-mono font-bold">
                  {correctPlacements}/{total}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span>Score:</span>
                <span className="font-mono font-bold">{score}/100</span>
              </div>

              <div className="grid grid-cols-4 gap-0">
                {evaluatedScores.map((score, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center text-2xl"
                  >
                    {getScoreEmoji(score)}
                  </div>
                ))}
              </div>

              <Button
                className="w-full bg-neutral-900 text-white hover:bg-neutral-800"
                onClick={handleShare}
                size="lg"
              >
                <Share className="mr-2 h-4 w-4" />
                Share Score
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
