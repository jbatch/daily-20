import { type FC } from "react";
import { Button } from "@/components/ui/button";
import { Share, BarChart2, HelpCircle } from "lucide-react";
import { HowToPlay, useHowToPlayDialog } from "./HowToPlay";

type HeaderProps = {
  onStatsClick: () => void;
  onShareClick: () => void;
  day: number;
  showShare?: boolean;
  statsEnabled?: boolean;
};

export const Header: FC<HeaderProps> = ({
  onStatsClick,
  onShareClick,
  day,
  showShare = false,
  statsEnabled = false,
}) => {
  const { showHowToPlay, setShowHowToPlay } = useHowToPlayDialog();

  return (
    <>
      <header className="w-full max-w-lg flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">D20</h1>
        <h1 className="text-2xl font-bold">#{day}</h1>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowHowToPlay(true)}
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onStatsClick}
            disabled={!statsEnabled}
          >
            <BarChart2 className="h-5 w-5" />
          </Button>
          {showShare && (
            <Button variant="ghost" size="icon" onClick={onShareClick}>
              <Share className="h-5 w-5" />
            </Button>
          )}
        </div>
      </header>

      <HowToPlay open={showHowToPlay} onOpenChange={setShowHowToPlay} />
    </>
  );
};
