import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type HowToPlayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const HowToPlay = ({ open, onOpenChange }: HowToPlayProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How to Play D20</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Game Rules</h3>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Each day, you'll get 20 random numbers between 1-999</li>
                  <li>Place numbers on the grid in ascending order.</li>
                  <li>
                    Your score is based on how well you place the numbers
                    relative to their ideal positions.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Scoring</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white">
                      🟩
                    </div>
                    <span>Perfect placement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center text-white">
                      🟨
                    </div>
                    <span>Close to ideal position</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white">
                      🟧
                    </div>
                    <span>Far from ideal position</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white">
                      🟥
                    </div>
                    <span>Very far from ideal position</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Tips</h3>
                <ul className="list-disc pl-4 space-y-2">
                  <li>
                    Consider spreading out early numbers to leave space for
                    middle values
                  </li>
                  <li>
                    The grid flows from lower numbers (top-left) to higher
                    numbers (bottom-right)
                  </li>
                </ul>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export const useHowToPlayDialog = () => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("d20_has_seen_tutorial");
    if (!hasSeenTutorial) {
      setShowHowToPlay(true);
      localStorage.setItem("d20_has_seen_tutorial", "true");
    }
  }, []);

  return {
    showHowToPlay,
    setShowHowToPlay,
  };
};
